module.exports = {
    getDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-Us', {month: 'short',  day: '2-digit', year: 'numeric'})
    }
}
