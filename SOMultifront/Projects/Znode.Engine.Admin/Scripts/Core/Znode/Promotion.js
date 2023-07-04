var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Promotion = /** @class */ (function (_super) {
    __extends(Promotion, _super);
    function Promotion() {
        var _this = _super.call(this) || this;
        _this._endpoint = new Endpoint();
        return _this;
    }
    Promotion.prototype.Init = function () {
        if ($("#PromotionId").val() > 0)
            Promotion.prototype.SetPromotionDiscountType();
        Promotion.prototype.ShowHidePanel();
        Promotion.prototype.ShowHideCouponContainer();
        Promotion.prototype.ChangeHeading();
        Promotion.prototype.ShowHideGenerateButton();
        Promotion.prototype.HideCouponTab();
        Promotion.prototype.GetSelectedProduct();
        Promotion.prototype.ValidatePromotionCodeExist();
    };
    Promotion.prototype.SetMultiselectDropdown = function () {
        Promotion.prototype.SetProfileDropdown();
        Promotion.prototype.SetCatalogDropdown();
        Promotion.prototype.SetCategoryDropdown();
    };
    Promotion.prototype.SetProfileDropdown = function () {
        var profileId = $("#hdnProfileIds").val().split(',');
        for (var i in profileId) {
            var optionVal = profileId[i];
            $("select#ddlProfile").find("option[value=" + optionVal + " ]").prop("selected", "selected");
        }
        refreshControl("ddlProfile");
    };
    Promotion.prototype.ShowHideProfileList = function (control) {
        if (control != '' && control != undefined) {
            if (control.checked) {
                $(".fstElement").removeClass('input-validation-error');
                $(".fstControls .fstChoiceRemove").click();
                $("#valProfile").text('').text("").removeClass("field-validation-error").hide();
                $(".profilelist").hide();
            }
            else {
                ZnodeBase.prototype.SetInitialMultifastselectInput(null, null, $("#ddlProfile"));
                $(".profilelist").show();
            }
        }
    };
    Promotion.prototype.SetCatalogDropdown = function () {
        var catalogIds = $("#hdnCatalogIds").val().split(',');
        for (var i in catalogIds) {
            var optionVal = catalogIds[i];
            $("select#ddlCatalog").find("option[value=" + optionVal + " ]").prop("selected", "selected");
        }
        refreshControl("ddlCatalog");
    };
    Promotion.prototype.SetCategoryDropdown = function () {
        var categoryIds = $("#hdnCategoryIds").val().split(',');
        for (var i in categoryIds) {
            var optionVal = categoryIds[i];
            $("select#ddlCategory").find("option[value=" + optionVal + " ]").prop("selected", "selected");
        }
        refreshControl("ddlCategory");
    };
    Promotion.prototype.HideCouponTab = function () {
        if ($("#PromotionId").val() == 0)
            $("#AllStoreId").attr("disabled", false);
        switch ($("#ddlPromotionType option:selected").text().toLowerCase()) {
            case "Percent Off Displayed Product Price".toLowerCase():
            case "Product Details".toLowerCase():
            case "Amount Off Displayed Product Price".toLowerCase():
            case "Call For Pricing".toLowerCase():
                $("#CouponInfoTab").hide();
                $('#IsCouponRequired').prop('checked', false);
                $('#IsUnique').prop('checked', false);
                $("#txtAvailableQuantity").val('');
                $("#txtCouponCode").val('');
                $("#txtInitialQuantity").val('');
                $("#txtCouponCodeLength").val('');
                break;
            default:
                $("#CouponInfoTab").show();
                break;
        }
    };
    Promotion.prototype.ShowHidePanel = function () {
        $(".groupPannel").off("click");
        $(".groupPannel").on("click", function () {
            $(".promoDiv").hide();
            $("#promotionAsidePannel>li.tab-selected").removeClass("tab-selected");
            var groupCode = $(this).attr("data-groupcode");
            $('li[data-groupcode=' + groupCode + ']').addClass('tab-selected');
            $('#' + groupCode).show();
            if (groupCode === "PromotionInfo" || groupCode === "CouponInfo") {
                Promotion.prototype.HideAssociatedDivs();
                if ($("#PromotionId").val() > 0)
                    Promotion.prototype.isLoadDiscountDiv = false;
            }
            else if (groupCode === "DiscountInfo") {
                Promotion.prototype.DiscountInfoSection();
            }
        });
    };
    Promotion.prototype.DiscountInfoSection = function () {
        if ($("#PromotionId").val() > 0) {
            $("#ddlPromotionType").prop('disabled', true);
            $('#DiscountInfo').append("<input type='hidden' name= 'ddlPromotionType_attr' value= '" + $("#ddlPromotionType").val() + "' />");
            Promotion.prototype.SetPromotionDiscountType();
        }
        else {
            if ($("#AssociatedCatelogList").length > 0)
                $("#divAssociatedCatelogs").show();
            else if ($("#AssociatedCategoryList").length > 0)
                $("#divAssociatedCategories").show();
            else if ($("#AssociatedProductsList").length > 0)
                $("#divAssociatedProducts").show();
            else if ($("#ZnodePromotionAssociatedBrandDetails").length > 0)
                $("#divAssociatedBrands").show();
            else if ($("#ZnodePromotionAssociatedShippingDetails").length > 0)
                $("#divAssociatedShippings").show();
        }
    };
    Promotion.prototype.ChangeHeading = function () {
        $(".groupPannel").on("click", function () {
            var groupCode = $(this).attr("data-groupcode");
            if (groupCode == "PromotionInfo") {
                $("#PromotionHead").show();
                $("#DiscountHead").hide();
                $("#CouponHead").hide();
            }
            else if (groupCode == "DiscountInfo") {
                $("#PromotionHead").hide();
                $("#DiscountHead").show();
                $("#CouponHead").hide();
            }
            else if (groupCode == "CouponInfo") {
                $("#PromotionHead").hide();
                $("#DiscountHead").hide();
                $("#CouponHead").show();
            }
        });
    };
    Promotion.prototype.ShowHideCouponContainer = function () {
        if ($("#IsCouponRequired").is(":checked")) {
            $("#divSingleCupon").show();
            $("#divMultipleCupon").hide();
            $("#divCommon").show();
            if ($("#IsUnique").is(":checked")) {
                $("#divSingleCupon").hide();
                $("#divMultipleCupon").show();
            }
        }
        else {
            $("#divMultipleCupon").hide();
            $("#divSingleCupon").hide();
            $("#divCommon").hide();
            if ($("#PromotionId").val() == 0) {
                $("#IsUnique").attr("checked", false);
                $("#IsAllowedWithOtherCoupons").attr("checked", false);
                $("#PromotionMessage").val("");
                $("#txtCouponCode").val("");
                $("#txtAvailableQuantity").val("");
                $("#txtInitialQuantity").val("");
                $("#CustomCouponPreTextPostText").val("PreText");
                $("#CustomCouponCode").val("");
                $("#tblData tbody").html("");
            }
        }
    };
    Promotion.prototype.ValidateStore = function () {
        if ($('#AllStoreId').prop("checked") == false) {
            if ($('#txtPortalName').val() == "") {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").parent("div").addClass('input-validation-error');
                return false;
            }
        }
        return true;
    };
    Promotion.prototype.ValidateProfile = function () {
        if ($('#AllProfilesCheck').prop("checked") == false) {
            if ($('#ddlProfile').val() == "") {
                $("#valProfile").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectProfile")).addClass("field-validation-error").show();
                $("#ddlProfile").parent("div").addClass('input-validation-error');
                return false;
            }
        }
        return true;
    };
    Promotion.prototype.SavePromotion = function (backURL) {
        $('li[data-groupcode=PromotionInfo]').removeClass('active-tab-validation');
        $('li[data-groupcode=CouponInfo]').removeClass('active-tab-validation');
        $('li[data-groupcode=DiscountInfo]').removeClass('active-tab-validation');
        var isCouponInformationValid = this.CouponInfoCheckValid();
        $("#frmCreateEditPromotion").validate();
        if (!$("#frmCreateEditPromotion").valid()) {
            Promotion.prototype.ValidatePromotionCode();
            //Promotion tab contains validation
            $(".input-validation-error").parent().parent().parent().parent().parent().each(function () {
                if ($(this).parent().attr('id') != undefined)
                    $('li[data-groupcode=' + $(this).parent().attr('id') + ']').addClass('active-tab-validation');
                else
                    $('li[data-groupcode=' + $(this).parent().parent().attr('id') + ']').addClass('active-tab-validation');
                ZnodeBase.prototype.HideLoader();
            });
            if (!isCouponInformationValid)
                $('li[data-groupcode=CouponInfo]').addClass('active-tab-validation');
            return false;
        }
        else if (!this.ValidateStore()) {
            $('li[data-groupcode=DiscountInfo]').addClass('active-tab-validation');
            return;
        }
        else if (!this.ValidateProfile()) {
            $('li[data-groupcode=DiscountInfo]').addClass('active-tab-validation');
            return;
        }
        else if (!isCouponInformationValid) {
            $('li[data-groupcode=CouponInfo]').addClass('active-tab-validation');
            return;
        }
        else if (!this.ValidatePromotionCode()) {
            $('li[data-groupcode=PromotionInfo]').addClass('active-tab-validation');
            return;
        }
        else {
            if (typeof (backURL) != "undefined")
                $.cookie("_backURL", backURL, { path: '/' });
            if ($("#IsCouponRequired").is(":checked") && $("#IsUnique").is(":unchecked")) {
                $("#txtInitialQuantity").val($("#txtAvailableQuantity").val());
            }
            $("#frmCreateEditPromotion").submit();
        }
    };
    Promotion.prototype.ValidateIsUniqueCheckedFields = function () {
        if (($("#txtInitialQuantity").val() == "")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("EnterInitialQuantity"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        Products.prototype.HideErrorMessage($("#txtInitialQuantity"), $("#valInitialQuantity"));
        if (($("#txtInitialQuantity").val() > 9999) || ($("#txtInitialQuantity").val() < 1)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("InitialQuantityInRange"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        Products.prototype.HideErrorMessage($("#txtInitialQuantity"), $("#valInitialQuantity"));
    };
    Promotion.prototype.CouponInfoCheckValid = function () {
        var isValid = true;
        if ($("#IsCouponRequired").is(":checked")) {
            if ($("#IsUnique").is(":unchecked")) {
                if (this.IsAvailableQuantityValid())
                    Products.prototype.HideErrorMessage($("#txtAvailableQuantity"), $("#valAvailableQuantity"));
                else
                    isValid = false;
                if (this.IsCouponCodeValid())
                    Products.prototype.HideErrorMessage($("#txtCouponCode"), $("#valCouponCode"));
                else
                    isValid = false;
            }
            else if ($("#IsUnique").is(":checked")) {
                if ($("#tblData > tbody > tr").length < 1) {
                    Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("ErrorGenerateCouponCode"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
                    isValid = false;
                }
                if (!$("#CustomCouponCode").val().match(/^[a-zA-Z0-9]*$/) && $("#IsCustomCoupon").is(":checked")) {
                    Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("OnlyAlphanumericareAllowed"), $("#CustomCouponCode"), $("#valCustomCouponCode"));
                    return false;
                }
            }
        }
        return isValid;
    };
    Promotion.prototype.IsInitialQuantityValid = function () {
        if ($("#CustomCouponCode").val() == "" && $("#IsCustomCoupon").is(":checked")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("EnterCustomCouponText"), $("#CustomCouponCode"), $("#valCustomCouponCode"));
            return false;
        }
        if (!$("#CustomCouponCode").val().match(/^[a-zA-Z0-9]*$/) && $("#IsCustomCoupon").is(":checked")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("OnlyAlphanumericareAllowed"), $("#CustomCouponCode"), $("#valCustomCouponCode"));
            return false;
        }
        if ((($("#CustomCouponCode").val().length > 15) || ($("#CustomCouponCode").val().length < 1)) && $("#IsCustomCoupon").is(":checked")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("CustomCouponTextLengthInRange"), $("#CustomCouponCode"), $("#valCustomCouponCode"));
            return false;
        }
        if (($("#txtInitialQuantity").val() == "")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("EnterInitialQuantity"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        if (isNaN($("#txtInitialQuantity").val())) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("OnlyNumericValueallow"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        if (($("#txtInitialQuantity").val() > 9999) || ($("#txtInitialQuantity").val() < 1)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("InitialQuantityInRange"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        if (!$("#txtInitialQuantity").val().match(/^([0-9]{0,7})$/)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("ErrorEnterNaturalNumberForInitialQuantity"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        if (!$("#txtCouponCodeLength").val().match(/^([0-9]{0,7})$/)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("ErrorEnterNaturalNumberForCouponCodeLength"), $("#txtCouponCodeLength"), $("#valCouponCodeLength"));
            return false;
        }
        if ($("#txtCouponCodeLength").val() > 20 || $("#txtCouponCodeLength").val() < 1) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("CouponCodeLengthInRange"), $("#txtCouponCodeLength"), $("#valCouponCodeLength"));
            return false;
        }
        Products.prototype.HideErrorMessage($("#txtInitialQuantity"), $("#valInitialQuantity"));
        Products.prototype.HideErrorMessage($("#txtCouponCodeLength"), $("#valCouponCodeLength"));
        Products.prototype.HideErrorMessage($("#CustomCouponCode"), $("#valCustomCouponCode"));
        return true;
    };
    Promotion.prototype.IsAvailableQuantityValid = function () {
        if (($("#txtAvailableQuantity").val() == "")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("EnterAvailableQuantity"), $("#txtAvailableQuantity"), $("#valAvailableQuantity"));
            return false;
        }
        if (isNaN($("#txtAvailableQuantity").val())) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("OnlyNumericValueallow"), $("#txtAvailableQuantity"), $("#valAvailableQuantity"));
            return false;
        }
        if (($("#txtAvailableQuantity").val() > 9999) || ($("#txtAvailableQuantity").val() < 1)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("AvailableQuantityInRange"), $("#txtAvailableQuantity"), $("#valAvailableQuantity"));
            return false;
        }
        if (!$("#txtAvailableQuantity").val().match(/^([0-9]{0,7})$/)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("DeciamlValueNotAllowed"), $("#txtAvailableQuantity"), $("#valAvailableQuantity"));
            return false;
        }
        return true;
    };
    Promotion.prototype.SetPromotionDiscountType = function () {
        Promotion.prototype.RemoveValidationErrors();
        Promotion.prototype.ResetAssociatedDivs(false);
        ZnodeBase.prototype.ShowLoader();
        $("#hdnPromotionTypeName").val($("#ddlPromotionType option:selected").text());
        Endpoint.prototype.GetPromotionDiscountAttribute($("#ddlPromotionType option:selected").text(), function (response) {
            $('#Promotion-attribute').show();
            if (Promotion.prototype.isLoadDiscountDiv == undefined) {
                $('#Promotion-attribute').html("");
                $('#Promotion-attribute').html(response);
            }
            $.getScript("/Scripts/References/DynamicValidation.js");
            //Re-apply validation on same form
            $("form").removeData("validator");
            $("form").removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse("form");
            Promotion.prototype.HideCouponTab();
            Promotion.prototype.DisplayButtonContainer();
            Promotion.prototype.HideAssociatedDivs();
            if ($("#PromotionId").val() > 0) {
                Promotion.prototype.SetAttributeValues();
                if ($("#promotionAsidePannel>li.tab-selected").attr('data-groupcode') != "PromotionInfo")
                    Promotion.prototype.GetAssociatedGrid();
            }
            ZnodeBase.prototype.HideLoader();
            $.getScript("/Content/bootstrap-3.3.7/js/tooltip.min.js");
        });
    };
    Promotion.prototype.DisplayButtonContainer = function () {
        var selectedOption = ($("#ddlPromotionType option:selected").text());
        switch (selectedOption.toLowerCase()) {
            case "amount off catalog".toLowerCase():
            case "percent off catalog".toLowerCase():
                var AddBtn = $("#btn-find-catelog").html();
                $("#Catalog_0_0_0_0_attr").parent().append(AddBtn);
                $("#Catalog_0_0_0_0_attr").remove();
                break;
            case "percent off product".toLowerCase():
            case "amount off product".toLowerCase():
            case "percent off displayed product price".toLowerCase():
            case "amount off displayed product price".toLowerCase():
            case "Call For Pricing".toLowerCase():
                var AddBtn = $("#btn-find-product").html();
                $("#ProductToDiscount_0_0_0_0_attr").parent().append(AddBtn);
                $("#ProductToDiscount_0_0_0_0_attr").remove();
                break;
            case "Percent Off Category".toLowerCase():
            case "amount off category".toLowerCase():
                var AddBtn = $("#btn-find-category").html();
                $("#Category_0_0_0_0_attr").parent().append(AddBtn);
                $("#Category_0_0_0_0_attr").remove();
                break;
            case "Percent Off X If Y Purchased".toLowerCase():
            case "Amount Off X If Y Purchased".toLowerCase():
                if (Promotion.prototype.isLoadDiscountDiv || Promotion.prototype.isLoadDiscountDiv == undefined) {
                    var AddBtn = $("#btn-find-product").html();
                    $("#ProductToDiscount_0_0_0_0_attr").parent().append(AddBtn);
                    $("#ProductToDiscount_0_0_0_0_attr").prop('disabled', true);
                    var AddRequiredsBtn = $("#btn-required-product").html();
                    $("#RequiredProduct_0_0_0_0_attr").parent().append(AddRequiredsBtn);
                    $("#RequiredProduct_0_0_0_0_attr").prop('disabled', true);
                    $("#ProductToDiscount_0_0_0_0_attr, #RequiredProduct_0_0_0_0_attr").addClass('margin-bottom');
                }
                break;
            case "percent off brand".toLowerCase():
            case "amount off brand".toLowerCase():
                var AddBtn = $("#btn-find-brand").html();
                $("#Brand_0_0_0_0_attr").parent().append(AddBtn);
                $("#Brand_0_0_0_0_attr").remove();
                break;
            case "amount off shipping with carrier".toLowerCase():
            case "percent off shipping with carrier".toLowerCase():
                var AddBtn = $("#btn-find-shipping").html();
                $("#Shipping_0_0_0_0_attr").parent().append(AddBtn);
                $("#Shipping_0_0_0_0_attr").remove();
                break;
        }
    };
    Promotion.prototype.GetAssociatedGrid = function () {
        switch ($("#ddlPromotionType option:selected").text().toLowerCase()) {
            case "amount off catalog":
            case "percent off catalog":
                ZnodeBase.prototype.ShowLoader();
                var _associatedCatelog = $("#hdnPromotionCatalogs_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedCatelog(_storeId, _associatedCatelog, $("#PromotionId").val());
                break;
            case "percent off category":
            case "amount off category":
                ZnodeBase.prototype.ShowLoader();
                var _associatedCategory = $("#hdnPromotionCategories_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedCategory(_storeId, _associatedCategory, $("#PromotionId").val());
                break;
            case "percent off product":
            case "amount off product":
                ZnodeBase.prototype.ShowLoader();
                var _associatedProduct = $("#hdnPromotionProducts_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedProduct(_storeId, _associatedProduct, $("#PromotionId").val());
                break;
            case "call for pricing":
                ZnodeBase.prototype.ShowLoader();
                var _associatedProduct = $("#hdnPromotionProducts_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedProduct(_storeId, _associatedProduct, $("#PromotionId").val());
                break;
            case "percent off displayed product price":
            case "amount off displayed product price":
                ZnodeBase.prototype.ShowLoader();
                var _associatedProduct = $("#hdnPromotionProducts_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedProduct(_storeId, _associatedProduct, $("#PromotionId").val());
                break;
            case "percent off brand":
            case "amount off brand":
                ZnodeBase.prototype.ShowLoader();
                var _associatedbrand = $("#hdnPromotionBrands_attr").val();
                Promotion.prototype.GetAssociatedBrands(_associatedbrand, $("#PromotionId").val());
                break;
            case "amount off shipping with carrier":
            case "percent off shipping with carrier":
                ZnodeBase.prototype.ShowLoader();
                var _associatedShipping = $("#hdnPromotionShippings_attr").val();
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedShippings(_storeId, _associatedShipping, $("#PromotionId").val());
                break;
        }
    };
    Promotion.prototype.RemoveValidationErrors = function () {
        Products.prototype.HideErrorMessage($("#ddlPromotionType"), $("#valPromotioType"));
        Products.prototype.HideErrorMessage($("#txtdiscountAmount"), $("#valDiscount"));
        Products.prototype.HideErrorMessage($("#txtquantityMinimum"), $("#valQuantityMinimum"));
        Products.prototype.HideErrorMessage($("#ProductToDiscount"), $("#valReferralProduct"));
        Products.prototype.HideErrorMessage($("#txtPromotionProductQuantity"), $("#valPromoProdQuantity"));
        Products.prototype.HideErrorMessage($("#hdnPortalIds"), $("#valPortal"));
        Products.prototype.HideErrorMessage($("#ddlProfile"), $("#valProfile"));
        Products.prototype.HideErrorMessage($("#ddlCatalog"), $("#valCatalog"));
        Products.prototype.HideErrorMessage($("#ddlCategory"), $("#valCategory"));
    };
    Promotion.prototype.GenerateBox = function (control) {
        if (Promotion.prototype.IsInitialQuantityValid()) {
            var coupon_InitialQuantity = $("#txtInitialQuantity").val();
            var customCoupontext = $("#CustomCouponCode").val();
            var codeLength = $("#txtCouponCodeLength").val();
            var promoCodeTextBox = null;
            var pre_postText = $("#CustomCouponPreTextPostText").val();
            var usedtd = '<td><i class=z-inactive></i></td>';
            var isActivetd = '<td><input type="checkbox" class="grid-row-checkbox" checked="checked" name="isActiveCoupon">  <span class="lbl padding-8 "></span></td>';
            $("#divCouponList").show();
            var table = $("#tblData tbody");
            if ($("#PromotionId").val() == 0) {
                $("#tblData tbody").html('');
                usedtd = null;
            }
            var charset = "";
            switch ($("#CouponCodeFormat").val()) {
                case "Alphabets":
                    {
                        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                        break;
                    }
                case "Numeric":
                    {
                        charset = "0123456789";
                        break;
                    }
                default:
                    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            }
            Promotion.prototype.GenerateCouponFormat(customCoupontext, pre_postText, coupon_InitialQuantity, codeLength, table, usedtd, isActivetd, charset);
        }
    };
    Promotion.prototype.GenerateCouponFormat = function (customCoupontext, pre_postText, coupon_InitialQuantity, codeLength, table, usedtd, isActivetd, charSet) {
        if (Math.pow(charSet.length, codeLength) < coupon_InitialQuantity) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("UniqueCouponNotFound"), $("#txtInitialQuantity"), $("#valInitialQuantity"));
            return false;
        }
        Products.prototype.HideErrorMessage($("#txtInitialQuantity"), $("#valInitialQuantity"));
        var generatedIds = [];
        var promoCodeTextBox = null;
        while (generatedIds.length < coupon_InitialQuantity) {
            var code = Promotion.prototype.GenerateRandomCode(codeLength, charSet);
            if ($.inArray(code, generatedIds) == -1) {
                generatedIds.push(code);
                code = pre_postText == "PreText" ? (customCoupontext + code) : code + customCoupontext;
                promoCodeTextBox = "<input type='text' name='MultipleCouponCode' value='" + code.toUpperCase() + "' class='PromotionCode' readonly>";
                table.append("<tr class='couponRow'><td>" + promoCodeTextBox + "</td>" + usedtd + isActivetd.replace("isActiveCoupon", "isActiveCoupon_" + code.toUpperCase()) + "</tr>");
            }
        }
    };
    Promotion.prototype.GenerateRandomCode = function (charCount, charSet) {
        var code = '';
        for (var i = 1; i <= charCount; i++) {
            var randPos = Math.floor(Math.random() * charSet.length);
            code += charSet[randPos];
        }
        return code;
    };
    Promotion.prototype.ShowHideGenerateButton = function () {
        if ($("#IsUnique").is(":checked")) {
            $("#btnspanAddButton").show();
            $("#divMultipleCupon").show();
            $("#divSingleCupon").hide();
            $("#divCouponList").show();
        }
        else {
            $("#divMultipleCupon").hide();
            $("#divSingleCupon").show();
            $("#divCouponList").hide();
        }
    };
    Promotion.prototype.EnableMultipleCouponMode = function () {
        if ($("#IsUnique").is(":checked")) {
            $("#btnspanAddButton").show();
            $("#divMultipleCupon").show();
            $("#divSingleCupon").hide();
            $("#txtAvailableQuantity").val("");
            $("#txtCouponCode").val("");
        }
        else {
            $("#divMultipleCupon").hide();
            $("#divSingleCupon").show();
            $("#divCouponList").hide();
            $("#txtInitialQuantity").val("");
        }
    };
    Promotion.prototype.ShowHideCustomCouponContainer = function () {
        if ($("#IsCustomCoupon").is(":checked")) {
            $("#divCustomCouponContainer").show();
        }
        else {
            $("#divCustomCouponContainer").hide();
            $("#CustomCouponPreTextPostText").val("PreText");
            $("#CustomCouponCode").val("");
        }
    };
    Promotion.prototype.SetPortalData = function () {
        $("#hdnPortalIds").val();
        $("#txtPublishedProductName").val("");
        $("#txtReferalProductName").val("");
        Promotion.prototype.ProfileListByStoreId();
        Promotion.prototype.CatalogListByStoreId();
        Promotion.prototype.ResetAssociatedDivs(true);
    };
    Promotion.prototype.ProfileListByStoreId = function () {
        var storeId = $("#hdnPortalIds").val();
        if (storeId != undefined && storeId != "") {
            Endpoint.prototype.ProfileListByStorId(storeId, function (response) {
                $('#ddlProfile').html("");
                $.each(response, function (i, item) {
                    $('#ddlProfile').append("<option value='" + item.Value + "' > " + item.Text + " </option>");
                });
                $('#ddlProfile').data('fastselect').destroy();
                $('#ddlProfile').fastselect();
                $(".fstControls .fstChoiceRemove").click();
            });
        }
    };
    Promotion.prototype.CatalogListByStoreId = function () {
        var storeId = $("#hdnPortalIds").val();
        Endpoint.prototype.CatalogListByStorId(storeId, function (response) {
            $('#ddlCatalog').html("");
            $.each(response, function (i, item) {
                $('#ddlCatalog').append("<option value='" + item.Value + "' > " + item.Text + " </option>");
            });
        });
        Promotion.prototype.CategoryListByStorId();
    };
    Promotion.prototype.CategoryListByStorId = function () {
        var storeId = $("#hdnPortalIds").val();
        Endpoint.prototype.CategoryListByStorId(storeId, function (response) {
            $('#ddlCategory').html("");
            $.each(response, function (i, item) {
                $('#ddlCategory').append("<option value='" + item.Value + "' > " + item.Text + " </option>");
            });
        });
    };
    Promotion.prototype.BindCatalogList = function (catalog, storeName) {
        var storeIds = "";
        if (storeName != null || storeName != undefined)
            storeIds = storeName.toString();
        Endpoint.prototype.CatalogListByStorIds(storeIds, function (response) {
            destroyControl(catalog);
            $('#' + catalog).append("<option value='0'>Select All</option>");
            for (var i = 0; i < response.length; i++) {
                $('#' + catalog).append("<option value='" + response[i].Value + "'>" + response[i].Text + "</option>");
            }
            Promotion.prototype.SetCatalogDropdown();
            refreshControl(catalog);
        });
    };
    Promotion.prototype.BindCategoryList = function (catergory, storeName) {
        var storeIds = "";
        if (storeName != null || storeName != undefined)
            storeIds = storeName.toString();
        Endpoint.prototype.CategoryListByStorIds(storeIds, function (response) {
            destroyControl(catergory);
            $('#' + catergory).append("<option value='0'>Select All</option>");
            for (var i = 0; i < response.length; i++) {
                $('#' + catergory).append("<option value='" + response[i].Value + "'>" + response[i].Text + "</option>");
            }
            Promotion.prototype.SetCategoryDropdown();
            refreshControl(catergory);
        });
    };
    Promotion.prototype.BindProductList = function (product, storeName) {
        var storeIds = "";
        if (storeName != null || storeName != undefined)
            storeIds = storeName.toString();
        Endpoint.prototype.ProductListByStorIds(storeIds, function (response) {
            destroyControl(product);
            $('#' + product).append("<option value='0'>Select All</option>");
            for (var i = 0; i < response.length; i++) {
                $('#' + product).append("<option value='" + response[i].Value + "'>" + response[i].Text + "</option>");
            }
            refreshControl(product);
        });
    };
    Promotion.prototype.DeleteMultiplePromotion = function (control) {
        var promotionIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (promotionIds.length > 0) {
            Endpoint.prototype.DeleteMultiplePromotion(promotionIds, function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Promotion.prototype.IsCouponCodeValid = function () {
        if (($("#txtCouponCode").val() == "")) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("EnterCouponCode"), $("#txtCouponCode"), $("#valCouponCode"));
            return false;
        }
        if (!$("#txtCouponCode").val().match(/^[a-zA-Z0-9]*$/)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("OnlyAlphanumericareAllowed"), $("#txtCouponCode"), $("#valCouponCode"));
            return false;
        }
        if (($("#txtCouponCode").val().length > 20) || ($("#txtCouponCode").val().length < 1)) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("CouponCodeLengthInRange"), $("#txtCouponCode"), $("#valCouponCode"));
            return false;
        }
        if (!Promotion.prototype.CheckCouponCodeExist()) {
            Products.prototype.ShowErrorMessage(ZnodeBase.prototype.getResourceByKeyName("AlreadyExistCouponCode"), $("#txtCouponCode"), $("#valCouponCode"));
            return false;
        }
        return true;
    };
    Promotion.prototype.MergeValues = function (existingAssociatedValue, newAssociatedValue) {
        if (existingAssociatedValue != undefined && existingAssociatedValue.length > 0) {
            return (existingAssociatedValue + "," + newAssociatedValue);
        }
        else
            return newAssociatedValue;
    };
    Promotion.prototype.HideAssociatedDivs = function () {
        $('#divAssociatedCatelogs').hide();
        $('#divAssociatedCategories').hide();
        $('#divAssociatedProducts').hide();
        $('#divAssociatedBrands').hide();
        $('#divAssociatedShippings').hide();
    };
    Promotion.prototype.ResetAssociatedDivs = function (isReset) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        if (promotionId == 0 || isReset == true) {
            $('#divAssociatedCatelogs').html("");
            $('#hdnPromotionCatalogs_attr').val('');
            $('#divAssociatedCategories').html("");
            $('#hdnPromotionCategories_attr').val('');
            $('#divAssociatedProducts').html("");
            $('#hdnPromotionBrands_attr').val('');
            $('#divAssociatedBrands').html("");
            $('#hdnPromotionProducts_attr').val('');
            $("#ProductToDiscount_0_0_0_0_attr").val('');
            $("#RequiredProduct_0_0_0_0_attr").val('');
            $('#hdnPromotionShippings_attr').val('');
            $('#divAssociatedShippings').html("");
        }
    };
    Promotion.prototype.ShowHideSaveCancelButton = function () {
        if ($("#PublishedCatelogList").find("tr").length > 0) {
            $("#divSave").show();
        }
        else if ($("#PublishedProductList").find("tr").length > 0) {
            $("#divSave").show();
        }
        else if ($("#PublishedCategoryList").find("tr").length > 0) {
            $("#divSave").show();
        }
        else if ($("#BrandListPanel").find("tr").length > 0) {
            $("#divSave").show();
        }
        else if ($("#ShippingListPanel").find("tr").length > 0) {
            $("#divSave").show();
        }
        else {
            $("#divSave").hide();
        }
    };
    Promotion.prototype.SetAttributeValues = function () {
        if (Promotion.prototype.isLoadDiscountDiv || Promotion.prototype.isLoadDiscountDiv == undefined) {
            $("#DiscountAmount_0_0_0_0_attr").val($("#hdnDiscountAmount").val());
            if ($("#hdnMinQuantity").val() != "")
                $("#MinimumQuantity_0_0_0_0_attr").val(parseInt($("#hdnMinQuantity").val(), 10));
            $("#MinimumOrderAmount_0_0_0_0_attr").val($("#hdnMinOrderAmount").val());
        }
        if ($("#ddlPromotionType option:selected").text() == "Amount Off X If Y Purchased" || $("#ddlPromotionType option:selected").text() == "Percent Off X If Y Purchased") {
            if (Promotion.prototype.isLoadDiscountDiv || Promotion.prototype.isLoadDiscountDiv == undefined) {
                $("#ProductToDiscount_0_0_0_0_attr").val($("#hdnAssignedProductName").val());
                $("#RequiredProduct_0_0_0_0_attr").val($("#hdnReferralProductName").val());
                $("#ProductQuantity_0_0_0_0_attr").val(parseInt($("#hdnProductQuantity").val(), 10));
            }
        }
        $("#CallForPriceMessage_0_0_0_0_attr").val($("#hdnCallForPrice").val());
    };
    Promotion.prototype.HideAsidePannelProductsControls = function () {
        $("#grid th:first-child").hide();
        $("#grid td:first-child").hide();
        $("#divSave").hide();
        $('#grid tr').css('cursor', 'pointer');
    };
    Promotion.prototype.GetSelectedProduct = function () {
        var productName = "";
        var productId = "0";
        $(this).css('cursor', 'pointer');
        $(document).on("click", "section[update-container-id=PublishedProductList] tr", function () {
            if ($("#ddlPromotionType option:selected").text() == "Amount Off X If Y Purchased" || $("#ddlPromotionType option:selected").text() == "Percent Off X If Y Purchased") {
                productId = $(this).find(".grid-row-checkbox").attr("id").split("_")[1];
                productName = $(this).find("td.productnameclass").text();
                $('#PublishedProductPanel').hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                if ($("#hdnIsReferalProduct").val() == "true") {
                    $("#RequiredProduct_0_0_0_0_attr").val(productName);
                    $("#hdnReferalProductId_attr").val(productId);
                }
                else {
                    $("#ProductToDiscount_0_0_0_0_attr").val(productName);
                    $("#hdnPromotionProducts_attr").val(productId);
                }
            }
        });
    };
    // Check Promotion Code is exist or not.
    Promotion.prototype.ValidatePromotionCodeExist = function () {
        $("#PromoCode").on("blur", function () {
            ZnodeBase.prototype.ShowLoader();
            Promotion.prototype.ValidatePromotionCode();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.ValidatePromotionCode = function () {
        var isValid = true;
        if ($("#PromoCode").val() != '') {
            Endpoint.prototype.IsPromotionCodeExist($("#PromoCode").val(), $('#PromotionId').val(), function (response) {
                if (!response) {
                    $("#PromoCode").addClass("input-validation-error");
                    $("#errorSpanPromoCode").addClass("error-msg");
                    $("#errorSpanPromoCode").text(ZnodeBase.prototype.getResourceByKeyName("AlreadyExistPromotionCode"));
                    $("#errorSpanPromoCode").show();
                    isValid = false;
                }
            });
        }
        return isValid;
    };
    Promotion.prototype.CheckCouponCodeExist = function () {
        var isValid = true;
        if ($("#txtCouponCode").val() != '') {
            Endpoint.prototype.CheckCouponCodeExist($("#txtCouponCode").val(), $('#PromotionId').val(), function (response) {
                if (!response) {
                    isValid = false;
                }
            });
        }
        return isValid;
    };
    //========================================================== Product ========================================================================================================
    Promotion.prototype.AssociateProducts = function () {
        ZnodeBase.prototype.ShowLoader();
        var ProductIds = DynamicGrid.prototype.GetMultipleSelectedIds('PublishedProductList');
        if (ProductIds.length > 0) {
            var newAssociatedValue = Promotion.prototype.MergeValues($("#hdnPromotionProducts_attr").val(), ProductIds);
            $("#hdnPromotionProducts_attr").val(ProductIds);
            var _associatedProduct = $("#hdnPromotionProducts_attr").val();
            var _storeId = $("#hdnPortalIds").val();
            if (_associatedProduct.length > 0 && $("#PromotionId").val() > 0) {
                $("#hdnPromotionProducts_attr").val(newAssociatedValue);
                Promotion.prototype.AssociateProductToPromotion(_storeId, _associatedProduct, $("#PromotionId").val(), $("#ddlPromotionType option:selected").text());
            }
            else if (_associatedProduct.length > 0) {
                $("#hdnPromotionProducts_attr").val(newAssociatedValue);
                Promotion.prototype.GetAssociatedProduct(_storeId, newAssociatedValue, $("#PromotionId").val());
            }
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("AssociateProducts"), 'success', isFadeOut, fadeOutTime);
        }
        else {
            $("#PleaseSelectAtleastOneRecordError").show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Promotion.prototype.AssociateProductToPromotion = function (storeId, associatedProductds, promotionId, discountTypeName) {
        Endpoint.prototype.AssociateProductToPromotion(storeId, associatedProductds, promotionId, discountTypeName, function (response) {
            $('#PublishedProductPanel').hide(700);
            Promotion.prototype.GetAssociatedProduct(storeId, "0", promotionId);
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.GetAssociatedProduct = function (storeId, associatedProduct, promotionId) {
        Endpoint.prototype.GetAssociatedProduct(storeId, associatedProduct, promotionId, function (response) {
            $('#PublishedProductPanel').hide(700);
            $('#divAssociatedProducts').html("");
            ZnodeBase.prototype.RemoveAsidePopupPanel();
            $('#divAssociatedProducts').html(response);
            $('#divAssociatedProducts').show();
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.DeleteAssociatedProducts = function (control) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        var associatedProductIds = null;
        if (promotionId == 0) {
            var SelectedProductIds = DynamicGrid.prototype.GetMultipleSelectedIds("AssociatedProductsList");
            if (SelectedProductIds.length > 0) {
                associatedProductIds = $("#hdnPromotionProducts_attr").val();
                var associatedProductIdsArray = [];
                var selectedProductIdsArray = [];
                associatedProductIdsArray = associatedProductIds.split(",");
                selectedProductIdsArray = SelectedProductIds.split(",");
                var differenceOfAssociatedProductIdsArray = $(associatedProductIdsArray).not(selectedProductIdsArray).get();
                $("#hdnPromotionProducts_attr").val(differenceOfAssociatedProductIdsArray);
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedProduct(_storeId, differenceOfAssociatedProductIdsArray.toString(), promotionId);
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
            }
        }
        else {
            associatedProductIds = DynamicGrid.prototype.GetMultipleSelectedIds();
            if (associatedProductIds.length > 0) {
                Endpoint.prototype.DeleteAssociatedPromotionProducts(associatedProductIds, promotionId, function (res) {
                    DynamicGrid.prototype.RefreshGridOndelete(control, res);
                });
            }
        }
    };
    //Delete associated product ids form promotion.
    Promotion.prototype.DeleteRecentlyAssociatedProducts = function () {
        $("#grid tbody tr td").find(".z-delete").each(function () {
            var promotionId = parseInt($("#PromotionId").val(), 10);
            if (promotionId == 0) {
                $(this).removeAttr("onclick");
                $(this).attr("data-target", "#DeletePopUpConfirm");
            }
        });
        $("#grid tbody tr td").find(".z-delete").click(function (e) {
            var SelectedProductIds = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            $("#hdnDeleteProductID").val(SelectedProductIds);
            $("#DeletePopUpConfirm").show();
        });
    };
    Promotion.prototype.DeleteAssociatedSingleProduct = function (control) {
        var associatedProductIds = $("#hdnPromotionProducts_attr").val();
        var associatedProductIdsArray = [];
        associatedProductIdsArray = associatedProductIds.split(",");
        var SelectedProductIds = $("#hdnDeleteProductID").val();
        var SelectedProductIdsArray = [];
        SelectedProductIdsArray = SelectedProductIds.split(",");
        var differenceOfAssociatedProductIdsArray = $(associatedProductIdsArray).not(SelectedProductIdsArray).get();
        $("#hdnPromotionProducts_attr").val(differenceOfAssociatedProductIdsArray);
        var _storeId = $("#hdnPortalIds").val();
        Promotion.prototype.GetAssociatedProduct(_storeId, differenceOfAssociatedProductIdsArray.toString(), $("#PromotionId").val());
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
    };
    Promotion.prototype.FindProductsForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionProducts_attr').val();
        $('#hdnIsReferalProduct').val("false");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedProducts?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedProductPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedProducts?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedProductPanel');
    };
    Promotion.prototype.FindRequiredProductsForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionProducts_attr').val();
        $('#hdnIsReferalProduct').val("true");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedProducts?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedProductPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedProducts?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedProductPanel');
    };
    //========================================================== Product End==================================================================================================
    //========================================================== Category========================================================================================================
    Promotion.prototype.AssociateCategories = function () {
        ZnodeBase.prototype.ShowLoader();
        var CategoryIds = DynamicGrid.prototype.GetMultipleSelectedIds('PublishedCategoryList');
        if (CategoryIds.length > 0) {
            var newAssociatedValue = Promotion.prototype.MergeValues($("#hdnPromotionCategories_attr").val(), CategoryIds);
            $("#hdnPromotionCategories_attr").val(CategoryIds);
            var _associatedCategory = $("#hdnPromotionCategories_attr").val();
            var _storeId = $("#hdnPortalIds").val();
            if (_associatedCategory.length > 0 && $("#PromotionId").val() > 0) {
                Promotion.prototype.AssociateCategoryToPromotion(_storeId, _associatedCategory, $("#PromotionId").val());
            }
            else if (_associatedCategory.length > 0) {
                $("#hdnPromotionCategories_attr").val(newAssociatedValue);
                Promotion.prototype.GetAssociatedCategory(_storeId, newAssociatedValue, $("#PromotionId").val());
            }
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("AssociateCategories"), 'success', isFadeOut, fadeOutTime);
        }
        else {
            $("#PleaseSelectAtleastOneRecordError").show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Promotion.prototype.GetAssociatedCategory = function (storeId, associatedCategory, promotionId) {
        Endpoint.prototype.GetAssociatedCategory(storeId, associatedCategory, promotionId, function (response) {
            $('#PublishedCategoryPanel').hide(700);
            $('#divAssociatedCategories').html("");
            ZnodeBase.prototype.RemoveAsidePopupPanel();
            $('#divAssociatedCategories').html(response);
            $('#divAssociatedCategories').show();
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.AssociateCategoryToPromotion = function (storeId, associatedCategory, promotionId) {
        Endpoint.prototype.AssociateCategoryToPromotion(storeId, associatedCategory, promotionId, function (response) {
            $('#PublishedCategoryPanel').hide(700);
            Promotion.prototype.GetAssociatedCategory(storeId, "0", promotionId);
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.DeleteAssociatedCategorys = function (control) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        var associatedCategoryIds = null;
        if (promotionId == 0) {
            var SelectedCategoryIds = DynamicGrid.prototype.GetMultipleSelectedIds("AssociatedCategoryList");
            if (SelectedCategoryIds.length > 0) {
                associatedCategoryIds = $("#hdnPromotionCategories_attr").val();
                var associatedCategoryIdsArray = [];
                associatedCategoryIdsArray = associatedCategoryIds.split(",");
                var SelectedCategoryIdsArray = [];
                SelectedCategoryIdsArray = SelectedCategoryIds.split(",");
                var differenceOfAssociatedCategoryIdsArray = $(associatedCategoryIdsArray).not(SelectedCategoryIdsArray).get();
                $("#hdnPromotionCategories_attr").val(differenceOfAssociatedCategoryIdsArray);
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedCategory(_storeId, differenceOfAssociatedCategoryIdsArray.toString(), promotionId);
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
            }
        }
        else {
            associatedCategoryIds = DynamicGrid.prototype.GetMultipleSelectedIds();
            if (associatedCategoryIds.length > 0) {
                Endpoint.prototype.DeleteAssociatedPromotionCategorys(associatedCategoryIds, promotionId, function (res) {
                    DynamicGrid.prototype.RefreshGridOndelete(control, res);
                });
            }
        }
    };
    //Delete associated Category ids form promotion.
    Promotion.prototype.DeleteRecentlyAssociatedCategorys = function () {
        $("#grid tbody tr td").find(".z-delete").each(function () {
            var promotionId = parseInt($("#PromotionId").val(), 10);
            if (promotionId == 0) {
                $(this).removeAttr("onclick");
                $(this).attr("data-target", "#DeletePopUpConfirm");
            }
        });
        $("#grid tbody tr td").find(".z-delete").click(function (e) {
            var SelectedCategoryIds = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            $("#hdnDeleteCategoryID").val(SelectedCategoryIds);
            $("#DeletePopUpConfirm").show();
        });
    };
    Promotion.prototype.DeleteAssociatedSingleCategory = function (control) {
        var associatedCategoryIds = $("#hdnPromotionCategories_attr").val();
        var associatedCategoryIdsArray = [];
        associatedCategoryIdsArray = associatedCategoryIds.split(",");
        var SelectedCategoryIds = $("#hdnDeleteCategoryID").val();
        var SelectedCategoryIdsArray = [];
        SelectedCategoryIdsArray = SelectedCategoryIds.split(",");
        var differenceOfAssociatedCategoryIdsArray = $(associatedCategoryIdsArray).not(SelectedCategoryIdsArray).get();
        $("#hdnPromotionCategories_attr").val(differenceOfAssociatedCategoryIdsArray);
        var _storeId = $("#hdnPortalIds").val();
        Promotion.prototype.GetAssociatedCategory(_storeId, differenceOfAssociatedCategoryIdsArray.toString(), $("#PromotionId").val());
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
    };
    Promotion.prototype.FindCategoryForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionCategories_attr').val();
        $('#hdnIsReferalProduct').val("false");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedCategories?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedCategoryPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedCategories?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedCategoryPanel');
    };
    //========================================================== Category End==================================================================================================
    //========================================================== Catalog========================================================================================================
    Promotion.prototype.AssociateCatelogs = function () {
        ZnodeBase.prototype.ShowLoader();
        var CatelogIds = DynamicGrid.prototype.GetMultipleSelectedIds('PublishedCatelogList');
        if (CatelogIds.length > 0) {
            var newAssociatedValue = Promotion.prototype.MergeValues($("#hdnPromotionCatalogs_attr").val(), CatelogIds);
            $("#hdnPromotionCatalogs_attr").val(CatelogIds);
            var _associatedCatelog = $("#hdnPromotionCatalogs_attr").val();
            var _storeId = $("#hdnPortalIds").val();
            if (_associatedCatelog.length > 0 && $("#PromotionId").val() > 0) {
                Promotion.prototype.AssociateCatalogToPromotion(_storeId, _associatedCatelog, $("#PromotionId").val());
            }
            else if (_associatedCatelog.length > 0) {
                $("#hdnPromotionCatalogs_attr").val(newAssociatedValue);
                Promotion.prototype.GetAssociatedCatelog(_storeId, newAssociatedValue, $("#PromotionId").val());
            }
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("AssociateCatalog"), 'success', isFadeOut, fadeOutTime);
        }
        else {
            $("#PleaseSelectAtleastOneRecordError").show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Promotion.prototype.GetAssociatedCatelog = function (storeId, associatedCatelog, promotionId) {
        Endpoint.prototype.GetAssociatedCatelog(storeId, associatedCatelog, promotionId, function (response) {
            $('#PublishedCatelogPanel').hide(700);
            $('#divAssociatedCatelogs').html("");
            ZnodeBase.prototype.RemoveAsidePopupPanel();
            $('#divAssociatedCatelogs').html(response);
            $('#divAssociatedCatelogs').show();
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.AssociateCatalogToPromotion = function (storeId, associatedCatelogIds, promotionId) {
        Endpoint.prototype.AssociateCatalogToPromotion(storeId, associatedCatelogIds, promotionId, function (response) {
            $('#PublishedCatelogPanel').hide(700);
            Promotion.prototype.GetAssociatedCatelog(storeId, "0", promotionId);
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.DeleteAssociatedCatalogs = function (control) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        var associatedCatalogIds = null;
        if (promotionId == 0) {
            var SelectedCatalogIds = DynamicGrid.prototype.GetMultipleSelectedIds("AssociatedCatelogList");
            if (SelectedCatalogIds.length > 0) {
                associatedCatalogIds = $("#hdnPromotionCatalogs_attr").val();
                var associatedCatalogIdsArray = [];
                associatedCatalogIdsArray = associatedCatalogIds.split(",");
                var SelectedCatalogIdsArray = [];
                SelectedCatalogIdsArray = SelectedCatalogIds.split(",");
                var differenceOfAssociatedCatalogIdsArray = $(associatedCatalogIdsArray).not(SelectedCatalogIdsArray).get();
                $("#hdnPromotionCatalogs_attr").val(differenceOfAssociatedCatalogIdsArray);
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedCatelog(_storeId, differenceOfAssociatedCatalogIdsArray.toString(), promotionId);
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
            }
        }
        else {
            associatedCatalogIds = DynamicGrid.prototype.GetMultipleSelectedIds();
            if (associatedCatalogIds.length > 0) {
                Endpoint.prototype.DeleteAssociatedPromotionCatalogs(associatedCatalogIds, promotionId, function (res) {
                    DynamicGrid.prototype.RefreshGridOndelete(control, res);
                });
            }
        }
    };
    //Delete associated Catalog ids form promotion.
    Promotion.prototype.DeleteRecentlyAssociatedCatalogs = function () {
        $("#grid tbody tr td").find(".z-delete").each(function () {
            var promotionId = parseInt($("#PromotionId").val(), 10);
            if (promotionId == 0) {
                $(this).removeAttr("onclick");
                $(this).attr("data-target", "#DeletePopUpConfirm");
            }
        });
        $("#grid tbody tr td").find(".z-delete").click(function (e) {
            var SelectedCatalogIds = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            $("#hdnDeleteCatalogID").val(SelectedCatalogIds);
            $("#DeletePopUpConfirm").show();
        });
    };
    Promotion.prototype.DeleteAssociatedSingleCatalog = function (control) {
        var associatedCatalogIds = $("#hdnPromotionCatalogs_attr").val();
        var associatedCatalogIdsArray = [];
        associatedCatalogIdsArray = associatedCatalogIds.split(",");
        var SelectedCatalogIds = $("#hdnDeleteCatalogID").val();
        var SelectedCatalogIdsArray = [];
        SelectedCatalogIdsArray = SelectedCatalogIds.split(",");
        var differenceOfAssociatedCatalogIdsArray = $(associatedCatalogIdsArray).not(SelectedCatalogIdsArray).get();
        $("#hdnPromotionCatalogs_attr").val(differenceOfAssociatedCatalogIdsArray);
        var _storeId = $("#hdnPortalIds").val();
        Promotion.prototype.GetAssociatedCatelog(_storeId, differenceOfAssociatedCatalogIdsArray.toString(), $("#PromotionId").val());
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
    };
    Promotion.prototype.FindCatalogForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionCatalogs_attr').val();
        $('#hdnIsReferalProduct').val("false");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedCatelogs?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedCatelogPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPublishedCatelogs?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'PublishedCatelogPanel');
    };
    //========================================================== Catalog End==================================================================================================
    //========================================================== Brand========================================================================================================
    Promotion.prototype.FindBrandForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionBrands_attr').val();
        $('#hdnIsReferalProduct').val("false");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPromotionBrands?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'BrandListPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPromotionBrands?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'BrandListPanel');
    };
    Promotion.prototype.AssociateBrands = function () {
        ZnodeBase.prototype.ShowLoader();
        var BrandIds = DynamicGrid.prototype.GetMultipleSelectedIds('BrandListPanel');
        if (BrandIds.length > 0) {
            var newAssociatedValue = Promotion.prototype.MergeValues($("#hdnPromotionBrands_attr").val(), BrandIds);
            $("#hdnPromotionBrands_attr").val(BrandIds);
            var _associatedBrand = $("#hdnPromotionBrands_attr").val();
            if (_associatedBrand.length > 0 && $("#PromotionId").val() > 0) {
                $("#hdnPromotionBrands_attr").val(newAssociatedValue);
                Promotion.prototype.AssociateBrandToPromotion(_associatedBrand, $("#PromotionId").val());
            }
            else if (_associatedBrand.length > 0) {
                $("#hdnPromotionBrands_attr").val(newAssociatedValue);
                Promotion.prototype.GetAssociatedBrands(newAssociatedValue, $("#PromotionId").val());
            }
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("AssociateBrand"), 'success', isFadeOut, fadeOutTime);
        }
        else {
            $("#PleaseSelectAtleastOneRecordError").show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Promotion.prototype.AssociateBrandToPromotion = function (associatedBrands, promotionId) {
        Endpoint.prototype.AssociateBrandToPromotion(associatedBrands, promotionId, function (response) {
            $('#BrandListPanel').hide(700);
            Promotion.prototype.GetAssociatedBrands("0", promotionId);
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.GetAssociatedBrands = function (associatedBrand, promotionId) {
        Endpoint.prototype.GetAssociatedBrands(associatedBrand, promotionId, function (response) {
            $('#BrandListPanel').hide(700);
            $('#divAssociatedBrands').html("");
            ZnodeBase.prototype.RemoveAsidePopupPanel();
            $('#divAssociatedBrands').html(response);
            $('#divAssociatedBrands').show();
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.DeleteAssociatedBrands = function (control) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        var associatedBrandIds = null;
        if (promotionId == 0) {
            var SelectedBrandIds = DynamicGrid.prototype.GetMultipleSelectedIds("ZnodePromotionAssociatedBrandDetails");
            if (SelectedBrandIds.length > 0) {
                associatedBrandIds = $("#hdnPromotionBrands_attr").val();
                var associatedBrandIdsArray = [];
                associatedBrandIdsArray = associatedBrandIds.split(",");
                var SelectedBrandIdsArray = [];
                SelectedBrandIdsArray = SelectedBrandIds.split(",");
                var differenceOfAssociatedBrandIdsArray = $(associatedBrandIdsArray).not(SelectedBrandIdsArray).get();
                $("#hdnPromotionBrands_attr").val(differenceOfAssociatedBrandIdsArray);
                Promotion.prototype.GetAssociatedBrands(differenceOfAssociatedBrandIdsArray.toString(), promotionId);
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
            }
        }
        else {
            associatedBrandIds = DynamicGrid.prototype.GetMultipleSelectedIds();
            if (associatedBrandIds.length > 0) {
                Endpoint.prototype.DeleteAssociatedPromotionBrands(associatedBrandIds, promotionId, function (res) {
                    DynamicGrid.prototype.RefreshGridOndelete(control, res);
                });
            }
        }
    };
    //Delete associated Brand ids form promotion.
    Promotion.prototype.DeleteRecentlyAssociatedBrands = function () {
        $("#grid tbody tr td").find(".z-delete").each(function () {
            var promotionId = parseInt($("#PromotionId").val(), 10);
            if (promotionId == 0) {
                $(this).removeAttr("onclick");
                $(this).attr("data-target", "#DeletePopUpConfirm");
            }
        });
        $("#grid tbody tr td").find(".z-delete").click(function (e) {
            var SelectedBrandIds = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            $("#hdnDeleteBrandID").val(SelectedBrandIds);
            $("#DeletePopUpConfirm").show();
        });
    };
    Promotion.prototype.DeleteAssociatedSingleBrand = function (control) {
        var associatedBrandIds = $("#hdnPromotionBrands_attr").val();
        var associatedBrandIdsArray = [];
        associatedBrandIdsArray = associatedBrandIds.split(",");
        var SelectedBrandIds = $("#hdnDeleteBrandID").val();
        var SelectedBrandIdsArray = [];
        SelectedBrandIdsArray = SelectedBrandIds.split(",");
        var differenceOfAssociatedBrandIdsArray = $(associatedBrandIdsArray).not(SelectedBrandIdsArray).get();
        $("#hdnPromotionBrands_attr").val(differenceOfAssociatedBrandIdsArray);
        Promotion.prototype.GetAssociatedBrands(differenceOfAssociatedBrandIdsArray.toString(), $("#PromotionId").val());
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
    };
    //========================================================== Shipping========================================================================================================
    Promotion.prototype.AssociateShippings = function () {
        ZnodeBase.prototype.ShowLoader();
        var ShippingIds = DynamicGrid.prototype.GetMultipleSelectedIds('ShippingListPanel');
        if (ShippingIds.length > 0) {
            var _storeId = $("#hdnPortalIds").val();
            var newAssociatedValue = Promotion.prototype.MergeValues($("#hdnPromotionShippings_attr").val(), ShippingIds);
            $("#hdnPromotionShippings_attr").val(ShippingIds);
            var _associatedShipping = $("#hdnPromotionShippings_attr").val();
            if (_associatedShipping.length > 0 && $("#PromotionId").val() > 0) {
                $("#hdnPromotionShippings_attr").val(newAssociatedValue);
                Promotion.prototype.AssociateShippingToPromotion(_storeId, _associatedShipping, $("#PromotionId").val());
            }
            else if (_associatedShipping.length > 0) {
                $("#hdnPromotionShippings_attr").val(newAssociatedValue);
                Promotion.prototype.GetAssociatedShippings(_storeId, newAssociatedValue, $("#PromotionId").val());
            }
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("AssociateShipping"), 'success', isFadeOut, fadeOutTime);
        }
        else {
            $("#PleaseSelectAtleastOneRecordError").show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Promotion.prototype.AssociateShippingToPromotion = function (storeId, associatedShippings, promotionId) {
        Endpoint.prototype.AssociateShippingToPromotion(associatedShippings, promotionId, function (response) {
            $('#ShippingListPanel').hide(700);
            Promotion.prototype.GetAssociatedShippings(storeId, "0", promotionId);
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
        });
    };
    Promotion.prototype.GetAssociatedShippings = function (storeId, associatedShipping, promotionId) {
        Endpoint.prototype.GetAssociatedShippings(storeId, associatedShipping, promotionId, function (response) {
            $('#ShippingListPanel').hide(700);
            $('#divAssociatedShippings').html("");
            ZnodeBase.prototype.RemoveAsidePopupPanel();
            $('#divAssociatedShippings').html(response);
            $('#divAssociatedShippings').show();
            DynamicGrid.prototype.ClearCheckboxArray();
            ZnodeBase.prototype.HideLoader();
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.DeleteAssociatedShippings = function (control) {
        var promotionId = parseInt($("#PromotionId").val(), 10);
        var associatedShippingIds = null;
        if (promotionId == 0) {
            var SelectedShippingIds = DynamicGrid.prototype.GetMultipleSelectedIds("ZnodePromotionAssociatedShippingDetails");
            if (SelectedShippingIds.length > 0) {
                associatedShippingIds = $("#hdnPromotionShippings_attr").val();
                var associatedShippingIdsArray = [];
                associatedShippingIdsArray = associatedShippingIds.split(",");
                var SelectedShippingIdsArray = [];
                SelectedShippingIdsArray = SelectedShippingIds.split(",");
                var differenceOfAssociatedShippingIdsArray = $(associatedShippingIdsArray).not(SelectedShippingIdsArray).get();
                $("#hdnPromotionShippings_attr").val(differenceOfAssociatedShippingIdsArray);
                var _storeId = $("#hdnPortalIds").val();
                Promotion.prototype.GetAssociatedShippings(_storeId, differenceOfAssociatedShippingIdsArray.toString(), promotionId);
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
            }
        }
        else {
            associatedShippingIds = DynamicGrid.prototype.GetMultipleSelectedIds();
            if (associatedShippingIds.length > 0) {
                Endpoint.prototype.DeleteAssociatedPromotionShippings(associatedShippingIds, promotionId, function (res) {
                    DynamicGrid.prototype.RefreshGridOndelete(control, res);
                });
            }
        }
    };
    //Delete associated Shipping ids form promotion.
    Promotion.prototype.DeleteRecentlyAssociatedShippings = function () {
        $("#grid tbody tr td").find(".z-delete").each(function () {
            var promotionId = parseInt($("#PromotionId").val(), 10);
            if (promotionId == 0) {
                $(this).removeAttr("onclick");
                $(this).attr("data-target", "#DeletePopUpConfirm");
            }
        });
        $("#grid tbody tr td").find(".z-delete").click(function (e) {
            var SelectedShippingIds = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            $("#hdnDeleteShippingID").val(SelectedShippingIds);
            $("#DeletePopUpConfirm").show();
        });
    };
    Promotion.prototype.DeleteAssociatedSingleShipping = function (control) {
        var associatedShippingIds = $("#hdnPromotionShippings_attr").val();
        var associatedShippingIdsArray = [];
        associatedShippingIdsArray = associatedShippingIds.split(",");
        var SelectedShippingIds = $("#hdnDeleteShippingID").val();
        var SelectedShippingIdsArray = [];
        SelectedShippingIdsArray = SelectedShippingIds.split(",");
        var differenceOfAssociatedShippingIdsArray = $(associatedShippingIdsArray).not(SelectedShippingIdsArray).get();
        var _storeId = $("#hdnPortalIds").val();
        $("#hdnPromotionShippings_attr").val(differenceOfAssociatedShippingIdsArray);
        Promotion.prototype.GetAssociatedShippings(_storeId, differenceOfAssociatedShippingIdsArray.toString(), $("#PromotionId").val());
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("UnassignSuccessful"), 'success', isFadeOut, fadeOutTime);
    };
    Promotion.prototype.FindShippingForPromotion = function (promotionId) {
        var storeId = $('#hdnPortalIds').val();
        var assignedIds = $('#hdnPromotionShippings_attr').val();
        $('#hdnIsReferalShipping').val("false");
        if ($('#AllStoreId').prop("checked") == false) {
            if (storeId > 0)
                ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPromotionShippingList?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'ShippingListPanel');
            else {
                $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("SelectPortal")).addClass("field-validation-error").show();
                $("#txtPortalName").addClass('input-validation-error');
            }
        }
        else
            ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPromotionShippingList?storeId=' + storeId + '&promotionId=' + promotionId + '&assignedIds=' + assignedIds + '', 'ShippingListPanel');
    };
    //========================================================== End Shipping========================================================================================================
    //This method is used to get portal list on aside panel.
    Promotion.prototype.GetPortalList = function () {
        ZnodeBase.prototype.BrowseAsidePoupPanel('/Promotion/GetPortalList', 'divStoreListAsidePanel');
    };
    //This method is used to select portal from list and show it on textbox.
    Promotion.prototype.GetPortalDetail = function () {
        $("[data-swhgcontainer='ZnodeUserPortalList']").find("tr").click(function () {
            var portalName = $(this).find("td[class='storecolumn']").text();
            var portalId = $(this).find("td")[0].innerHTML;
            $('#txtPortalName').val(portalName);
            $('#hdnPortalIds').val(portalId);
            Promotion.prototype.SetPortalData();
            $("#errorRequiredStore").text("").removeClass("field-validation-error").hide();
            $("#txtPortalName").removeClass('input-validation-error');
            $('li[data-groupcode=DiscountInfo]').removeClass('active-tab-validation');
            $('#divStoreListAsidePanel').hide(700);
            $("#ZnodeUserPortalList").html("");
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Promotion.prototype.OnSelectStoreDataBind = function (item) {
        if (item != undefined && item.Id > 0) {
            var portalId = item.Id;
            Store.prototype.OnSelectStoreAutocompleteDataBind(item);
            $('.fstToggleBtn').text(item.text);
            $('#hdnPortalIds').val(portalId);
            Promotion.prototype.SetPortalData();
            $('li[data-groupcode=DiscountInfo]').removeClass('active-tab-validation');
        }
    };
    Promotion.prototype.ShowStoreTextBox = function () {
        if ($('#AllStoreId').prop("checked") == true) {
            $('#divSingleStore').hide();
            $("#txtPortalName").val('');
            $('#hdnPortalIds').val(0);
            Promotion.prototype.SetPortalData();
            $("#errorRequiredStore").text('').text("").removeClass("field-validation-error").hide();
            $("#txtPortalName").removeClass('input-validation-error');
        }
        else {
            $('#divSingleStore').show();
            $('.fstToggleBtn').text('Select Store');
            $('#divSingleStore').find('span').removeClass('fstSelected');
        }
    };
    return Promotion;
}(ZnodeBase));
$(document).on("click", "#exportPromotionDataId", function (e) {
    setTimeout(function () { ZnodeBase.prototype.HideLoader(); }, 1000);
});
$(document).on("click", "#exportPromotionCouponDataId", function (e) {
    setTimeout(function () { ZnodeBase.prototype.HideLoader(); }, 1000);
});
//# sourceMappingURL=Promotion.js.map