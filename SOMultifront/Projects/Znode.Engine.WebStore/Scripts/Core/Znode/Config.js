var Config;
(function (Config) {
    Config.PaymentScriptUrl = $("#hdnPaymentAppUrl").val() + "/script/znodeapijs";
    Config.PaymentScriptUrlForACH = $("#hdnPaymentAppUrl").val() + "/script/znodeapijsforach";
    Config.PaymentApplicationUrl = $("#hdnPaymentAppUrl").val() + "/";
})(Config || (Config = {}));
//# sourceMappingURL=Config.js.map