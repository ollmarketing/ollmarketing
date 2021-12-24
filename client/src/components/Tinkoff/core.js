function tAddEventListener(e, t, n) {
    e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent('on' + t, n);
}

function doPay(e, callback) {
    if (e.Amount = window.__TinkoffNormalizeMoney(e.Amount), e.prePay) {
        var t = "https://securepay.tinkoff.ru/html/payForm/prePayForm.html?" + Object.keys(e).map(function(t) {
            return [t, e[t]].map(encodeURIComponent).join('=')
        }).join('&');

        if (e.Frame) {
            callback(t)
        } else {
            window.location.href = t
        }
    } else {
        if (e.OrderId || (e.OrderId = (new Date).getTime()), e.DATA) {
            if ("string" == typeof e.DATA) try {
                e.DATA = JSON.parse(e.DATA)
            } catch (t) {
                var n = {},
                    i = e.DATA.split('|');
                if (i.length > 0) {
                    for (var o = 0, a = i.length; o < a; o++) {
                        var r = i[o].split('='),
                            l = '';
                        r.length > 0 && (l = r[0].trim()) && (n[l] = r[1])
                    }
                    e.DATA = n
                } else delete e.DATA
            }
            e.DATA.connection_type = 'Widget2.0'
        } else e.DATA = {
            connection_type: 'Widget2.0'
        };
        if (e.Receipt) {
            if ('string' == typeof e.Receipt && (e.Receipt = JSON.parse(e.Receipt)), !(e.Phone || e.Email || e.Receipt.Email || e.Receipt.Phone)) {
                 return void alert('РџРѕР»Рµ E-mail РёР»Рё Phone РЅРµ РґРѕР»Р¶РЅРѕ Р±С‹С‚СЊ РїСѓСЃС‚С‹Рј.');
            }
            //(e.Email || e.Receipt.Email) && (e.Receipt.Email = e.Email || e.Receipt.Email), (e.Phone || e.Receipt.Phone) && (e.Receipt.Phone = e.Phone || e.Receipt.Phone)
        }
        delete e.Name
        delete e.Email
        delete e.Phone;
        var s = "https://securepay.tinkoff.ru/v2/Init",
            d = new XMLHttpRequest;
        d.open("POST", s, !0)
        d.setRequestHeader('Content-Type', 'application/json')
        d.onreadystatechange = function() {
            if (4 == d.readyState && 200 == d.status) {
                var t = JSON.parse(d.responseText);

                if (0 == t.ErrorCode && t.Success) {
                    var n = t.PaymentURL;
                    if (e.Frame) {
                        callback(t)
                    } else {
                        window.location.href = n
                    }
                } else alert("РР·РІРёРЅРёС‚Рµ, РїСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР° РїСЂРё СЂРµРіРёСЃС‚СЂР°С†РёРё Р·Р°РєР°Р·Р°. РћС€РёР±РєР°: " + t.ErrorCode + " " + t.Message + " " + t.Details);
            }
        } 
        d.send(JSON.stringify(e));
    }
}


module.exports = function (e, callback) {
    var t = e.email ? e.email : "",
        n = e.phone ? e.phone : "",
        i = e.name ? e.name : "",
        o = e.receipt ? e.receipt : "",
        a = e.DATA ? e.DATA : "",
        r = {
            TerminalKey: e.terminalkey,
            Amount: 100 * e.amount.replace(/,/gi, '.'),
            OrderId: e.order ? e.order : "",
            Description: e.description ? e.description : "",
            Frame: 'true' == e.frame.toLowerCase(),
            Language: e.language.toLowerCase(),
            Phone: n,
            Email: t,
            Name: i
        },
        l = '';

    return t && (l = 'Email=' + t), n && (l && (l += '|'), l = l + 'Phone=' + n), i && (l && (l += '|'), l = l + 'Name=' + i), a ? r.DATA = a + (l ? '|' + l : '') : l && (r.DATA = l), o && (r.Receipt = JSON.parse(o)), doPay(r, callback)
}

;(window.__TinkoffNormalizeMoney || (window.__TinkoffNormalizeMoney = function(e) {
    var t, n = e.toString().replace(/,/gi, '.'),
        i = n.match(/\./g),
        o = n.replace(/\./gi, '').match(/\D/);
    if (null != i) {
        if (1 != i.length || null != o) throw 'Р—РЅР°С‡РµРЅРёРµ "' + e.toString() + '" - РЅРµ СЏРІР»СЏРµС‚СЃСЏ С‡РёСЃР»РѕРј.';
        var a = (t = Number(n) / 100).toString().split('.');
        if(a.length === 2) {
            a[1].length < 2 && (a[1] = a[1] + '0')
            t = a[0] + a[1]
        } else {
            t = a[0] + '00'
        }
    } else t = n;
    return Number(t)
}));
