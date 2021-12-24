'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react'),
    Component = _require.Component;

var core = require('./core');

var payFormContainer = {
	zIndex: '9996',
	height: '100vh',
	width: '100vw',
	position: 'fixed',
	left: '0px',
	top: '0px'
};

var darkBackground = {
	zIndex: '9997',
	opacity: '0.6',
	position: 'fixed',
	left: '0px',
	top: '0px',
	bottom: '0px',
	right: '0px',
	border: '0px',
	overflow: 'visible',
	backgroundColor: 'rgb(0, 0, 0)'
};

var div_frame = {
	height: '100vh',
  maxHeight: "800px",
	width: '100%',
	maxWidth: '1200px',
	left: '50%',
	top: '72px',
	position: 'absolute',
	zIndex: '9998',
	border: '0px'
};

var closeButton = {
	top: '50px',
	width: '48px',
	height: '32px',
	right: '50%',
	background: 'url("https://securepay.tinkoff.ru/html/payForm/img/close-button.png") no-repeat',
	position: 'absolute',
	zIndex: '9999',
	cursor: 'pointer',
	border: 'none',
	visibility: 'visible'
};

var payFormIframe = {
	width: '100%',
	height: '100%',
	border: 'none',
	borderRadius: '3px',
	left: '-50%',
	position: 'relative',
	backgroundColor: 'white'
};

var Pay = function (_Component) {
	_inherits(Pay, _Component);

	function Pay(props) {
		_classCallCheck(this, Pay);

		var _this = _possibleConstructorReturn(this, (Pay.__proto__ || Object.getPrototypeOf(Pay)).call(this, props));

		_this.state = {
			link: false
		};
		return _this;
	}

	_createClass(Pay, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			core(this.props.form, (item) => {
				this.props.onPaymentInit(item);
				_this2.setState(_extends({}, _this2.state, {
					link: item.PaymentURL
				}));
			});
		}
	}, {
		key: 'handleClose',
		value: function handleClose() {
			var _this2 = this;
			
			this.setState(_extends({}, this.state, {
				link: false
			}), function () {
				_this2.props.onClose && _this2.props.onClose();
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				null,
				this.state.link && React.createElement(
					'div',
					{
						id: 'pay-form-container',
						onClick: function onClick(e) {
							return _this3.handleClose(e);
						},
						style: this.props.style && this.props.style.payFormContainer || payFormContainer },
					React.createElement('div', { style: this.props.style && this.props.style.darkBackground || darkBackground }),
					React.createElement(
						'div',
						{
							id: 'div_frame',
							style: this.props.style && this.props.style.div_frame || div_frame },
						React.createElement('input', {
							onClick: function onClick() {
								return _this3.handleClose();
							},
							type: 'button',
							value: '',
							style: this.props.style && this.props.style.closeButton || closeButton }),
						React.createElement('iframe', {
							name: 'pay-form-iframe',
							id: 'pay-form-iframe',
							src: this.state.link,
							style: this.props.style && this.props.style.payFormIframe || payFormIframe })
					)
				)
			);
		}
	}]);

	return Pay;
}(Component);

module.exports = {
	Pay: Pay,
	Link: core
};