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
var Store = /** @class */ (function (_super) {
    __extends(Store, _super);
    function Store() {
        var _this = _super.call(this) || this;
        _this._endPoint = new Endpoint();
        _this._notification = new ZnodeNotification();
        Store.prototype.GetValueOnFormPost();
        Store.prototype.BindCurrencyInfo();
        Store.prototype.LoadCatalogTree();
        Store.prototype.DisplayTreeNodeInfo();
        Store.prototype.SearchJstreeNode();
        WebSite.prototype.Init();
        return _this;
    }
    Store.prototype.Init = function () {
        Store.prototype.ShowHideValidationEmailNotifaction();
        Store.prototype.ShowAllRightLeftButton();
        $(document).on("UpdateGrid", Store.prototype.RefreshGridOnEdit);
        Store.prototype.GetApproverUsersByPortalId();
        Store.prototype.BindProfileDeleteConfirm();
        Store.prototype.IsDefaultWarehouse();
        Store.prototype.CheckBoxChangeEventListner();
        $(document).on("click", "#btnAllMoveLeft", function () {
            var selectedCitiesCount = $("#SelectedCities li").length;
            $("#SelectedCities li").each(function () {
                $("#UnAssignedListBox").append("<li data-id=" + $(this).attr("data-id") + " title='" + $(this).html() + "' data-value=" + $(this).attr("data-value") + ">" + $(this).html() + "</li>");
                $(this).remove();
                $("#btnAllMoveLeft").addClass("not-active");
                $("#btnAllMoveRight").removeClass("not-active");
                $("#btnMoveLeft").addClass("not-active");
            });
            var unAssignedListBoxCount = $("#UnAssignedListBox").length;
            if ((unAssignedListBoxCount + selectedCitiesCount) > 1) {
                $("#UnAssignedListBox li").each(function () {
                    if ($(this).hasClass('selected')) {
                        $("#btnAllUp").removeClass("not-active");
                        $("#btnMoveUp").removeClass("not-active");
                        $("#btnMoveDown").removeClass("not-active");
                        $("#btnAllDown").removeClass("not-active");
                    }
                });
            }
        });
        $(document).on("click", "#btnAllMoveRight", function () {
            $("#UnAssignedListBox li").each(function () {
                if ($(this).attr("data-mustshow") != "y") {
                    $("#SelectedCities").append("<li data-id=" + $(this).attr("data-id") + " title='" + $(this).html() + "' data-value=" + $(this).attr("data-value") + ">" + $(this).html() + "</li>");
                    $(this).remove();
                    $("#btnAllMoveRight").addClass("not-active");
                    $("#btnAllMoveLeft").removeClass("not-active");
                    $("#btnAllUp").addClass("not-active");
                    $("#btnMoveUp").addClass("not-active");
                    $("#btnMoveDown").addClass("not-active");
                    $("#btnAllDown").addClass("not-active");
                    $("#btnMoveRight").addClass("not-active");
                }
            });
        });
        $(document).on("click", "#btnMoveUp", function () {
            Store.prototype.listbox_move("UnAssignedListBox", "up");
        });
        $(document).on("click", "#btnMoveDown", function () {
            Store.prototype.listbox_move("UnAssignedListBox", "down");
        });
        $(document).on("click", "#btnAllUp", function () {
            Store.prototype.listbox_move("UnAssignedListBox", "First");
        });
        $(document).on("click", "#btnAllDown", function () {
            Store.prototype.listbox_move("UnAssignedListBox", "Last");
        });
        $(document).on("click", "#SelectedCities li", function (e) {
            if ($(this) != undefined) {
                $("#SelectedCities li").removeClass("selected");
                $(this).addClass("selected");
                $("#btnMoveLeft").removeClass("not-active");
            }
        });
        $(document).on("click", "#UnAssignedListBox li", function (e) {
            if ($(this) != undefined) {
                $("#UnAssignedListBox li").removeClass("selected");
                $(this).addClass("selected");
                if ($("#UnAssignedListBox li").length > 1) {
                    $("#btnAllUp").removeClass("not-active");
                    $("#btnMoveUp").removeClass("not-active");
                    $("#btnMoveDown").removeClass("not-active");
                    $("#btnAllDown").removeClass("not-active");
                }
                $("#btnMoveRight").removeClass("not-active");
            }
        });
        $(document).on("click", "#btnMoveLeft", function () {
            var elements = $("#SelectedCities li.selected");
            if (elements != undefined) {
                $("#UnAssignedListBox").append($("#SelectedCities li.selected"));
                elements.removeClass("selected");
                $("#btnMoveLeft").addClass("not-active");
                if ($("#SelectedCities li").length < 1)
                    $("#btnAllMoveLeft").addClass("not-active");
                if ($("#UnAssignedListBox li").length > 0) {
                    $("#btnAllMoveRight").removeClass("not-active");
                }
            }
        });
        $(document).on("click", "#btnMoveUp", function () {
            Store.prototype.listbox_move("RequestedSelectedCities", "up");
        });
        $(document).on("click", "#btnMoveRight", function () {
            var elements = $("#UnAssignedListBox li.selected");
            if (elements != undefined) {
                $("#SelectedCities").append($("#UnAssignedListBox li.selected"));
                elements.removeClass("selected");
                $("#btnMoveRight").addClass("not-active");
                if ($("#UnAssignedListBox li").length < 1) {
                    $("#btnAllMoveRight").addClass("not-active");
                    $("#btnAllMoveRight").addClass("not-active");
                    $("#btnAllUp").addClass("not-active");
                    $("#btnMoveUp").addClass("not-active");
                    $("#btnMoveDown").addClass("not-active");
                    $("#btnAllDown").addClass("not-active");
                }
                if ($("#SelectedCities li").length > 0)
                    $("#btnAllMoveLeft").removeClass("not-active");
            }
        });
    };
    Store.prototype.CheckBoxChangeEventListner = function () {
        $(document).on('change', 'input[type^="checkbox"]', function () {
            if ($(this).is(':checked') && $(this).val().toLowerCase() == 'catalog') {
                $('input[type^="checkbox"]').each(function () {
                    if ($(this).val().toLowerCase() == 'draft') {
                        if ($(this).prop('disabled')) {
                            $(this).prop('disabled', false);
                        }
                        if (!$(this).is(':checked')) {
                            $(this).prop('checked', true);
                        }
                    }
                });
            }
            else if (!$(this).is(':checked') && $(this).val().toLowerCase() == 'catalog') {
                $('input[type^="checkbox"]').each(function () {
                    if ($(this).val().toLowerCase() == 'draft') {
                        if (!$(this).prop('disabled')) {
                            $(this).prop('checked', false);
                            $(this).prop('disabled', true);
                        }
                    }
                });
            }
        });
    };
    Store.prototype.EnableEnhancedEcommerce = function () {
        if ($('#IsActive').prop('checked') == true && $("#TagManager_ContainerId").val() == "") {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorContainerId"), "error", isFadeOut, fadeOutTime);
            $('#IsActive').prop('checked', false);
            $('#EnableEnhancedEcommerce').prop('checked', false);
            $("#TagManager_ContainerId").focus();
        }
        else if ($('#IsActive').prop('checked') == false && $("#TagManager_ContainerId").val() != "") {
            $('#IsActive').prop('checked', false);
            $("#TagManager_ContainerId").prop("disabled", false);
            $('#EnableEnhancedEcommerce').prop('checked', false);
            $("#TagManager_ContainerId").focus();
        }
        else if ($('#IsActive').prop('checked')) {
            $('#EnableEnhancedEcommerce').prop('checked', false);
            $("#TagManager_ContainerId").prop("disabled", false);
            $("#TagManager_ContainerId").focus();
        }
    };
    Store.prototype.DisableEnhancedEcommerce = function () {
        if (($("#TagManager_ContainerId").val() == "") && ($('#EnableEnhancedEcommerce').prop('checked') == true)) {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorContainerId"), "error", isFadeOut, fadeOutTime);
            $('#EnableEnhancedEcommerce').prop('checked', false);
            $("#TagManager_ContainerId").focus();
        }
        else if ($('#EnableEnhancedEcommerce').prop('checked') == false && $("#TagManager_ContainerId").val() != "") {
            $('#EnableEnhancedEcommerce').prop('checked', false);
            $("#TagManager_ContainerId").focus();
        }
        else if ($('#EnableEnhancedEcommerce').prop('checked')) {
            $('#IsActive').prop('checked', true);
        }
    };
    Store.prototype.DisableEnhancedAnalyticsID = function () {
        var isActivechecked = $("#AnalyticsIsActive").is(":checked");
        if (($("#TagManager_AnalyticsUId").val() == "") && ($('#AnalyticsIsActive').prop('checked') == true)) {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorAnalyticsId"), "error", isFadeOut, fadeOutTime);
            $('#AnalyticsIsActive').prop('checked', false);
            $("#TagManager_AnalyticsUId").focus();
        }
        else if ($('#AnalyticsIsActive').prop('checked') == false && $("#TagManager_AnalyticsUId").val() != "") {
            $('#AnalyticsIsActive').prop('checked', false);
            $("#TagManager_AnalyticsUId").prop("disabled", false);
            $("#TagManager_AnalyticsUId").focus();
        }
        else if (!isActivechecked || $("#TagManager_AnalyticsUId").val() == "") {
            $("#TagManager_AnalyticsUId").prop("disabled", false);
            $("#TagManager_AnalyticsUId").focus();
        }
        else {
            $('#AnalyticsIsActive').prop('checked', true);
        }
    };
    Store.prototype.ValidateStore = function () {
        $("#DomainName :input").blur(function () {
            ZnodeBase.prototype.ShowLoader();
            Store.prototype.ValidateStoreDomainName();
            ZnodeBase.prototype.HideLoader();
        });
    };
    //Code for testing email
    Store.prototype.TestEmail = function (portalId) {
        if (this.validateSMTPSetting()) {
            Endpoint.prototype.TestEmail(portalId, function (res) {
                if (res != "") {
                    $("#divTestEmailPopup").modal("show");
                    $("#divTestEmailPopup").html(res);
                }
                else
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorMessage"), 'error', isFadeOut, fadeOutTime);
            });
        }
        else {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorEmailSetting"), 'error', isFadeOut, fadeOutTime);
        }
    };
    Store.prototype.validateSMTPSetting = function () {
        if ($("#SmtpPort").val() == "" || $("#SmtpServer").val() == "")
            return false;
        return true;
    };
    Store.prototype.GetUnAssociatedSortListForStore = function (PortalId) {
        DynamicGrid.prototype.ClearCheckboxArray();
        Endpoint.prototype.GetUnAssociatedSortListForStore(PortalId, function (res) {
            if (res != null && res != "") {
                var message = $('#ErrorMessage', res).val();
                if (message != null && message != "")
                    return ZnodeNotification.prototype.DisplayNotificationMessagesHelper(message, 'error', isFadeOut, fadeOutTime);
                else
                    Store.prototype.AppendResponseToAsidePanel(res);
                if ($("#UnassociatedSortListToPortal").find("tr").length == 0) {
                    $("#UnassociatedSortListToPortal").parent().next().hide();
                    $("#UnassociatedSortListToPortal").find(".filter-component").hide();
                }
                $("body").append("<div class='modal-backdrop fade in'></div>");
            }
        });
    };
    Store.prototype.GetUnassociatedSortList = function (PortalId) {
        DynamicGrid.prototype.ClearCheckboxArray();
        Endpoint.prototype.GetUnassociatedSortList(PortalId, function (res) {
            if (res != null && res != "") {
                var message = $('#ErrorMessage', res).val();
                if (message != null && message != "")
                    return ZnodeNotification.prototype.DisplayNotificationMessagesHelper(message, 'error', isFadeOut, fadeOutTime);
                else
                    Store.prototype.AppendResponseToAsidePanel(res);
                if ($("#UnassociatedSortListToPortal").find("tr").length == 0) {
                    $("#UnassociatedSortListToPortal").parent().next().hide();
                    $("#UnassociatedSortListToPortal").find(".filter-component").hide();
                }
                $("body").append("<div class='modal-backdrop fade in'></div>");
            }
        });
    };
    Store.prototype.AppendResponseToAsidePanel = function (res) {
        ZnodeBase.prototype.ShowLoader();
        $("#" + 'DivGetUnAssociatedSortSettingListForStore').html('');
        $("#" + 'DivGetUnAssociatedSortSettingListForStore').append(res);
        $("#" + 'DivGetUnAssociatedSortSettingListForStore').slideDown(200);
        $("body").css('overflow', 'hidden');
        ZnodeBase.prototype.HideLoader();
        GridPager.prototype.Init();
    };
    Store.prototype.GetUnassociatedPageList = function (PortalId) {
        DynamicGrid.prototype.ClearCheckboxArray();
        Endpoint.prototype.GetUnassociatedPageList(PortalId, function (res) {
            if (res != null && res != "") {
                var message = $('#ErrorMessage', res).val();
                if (message != null && message != "")
                    return ZnodeNotification.prototype.DisplayNotificationMessagesHelper(message, 'error', isFadeOut, fadeOutTime);
                else
                    Store.prototype.AppendResponseToPageAsidePanel(res);
                if ($("#UnassociatedPageListToPortal").find("tr").length == 0) {
                    $("#UnassociatedPageListToPortal").parent().next().hide();
                    $("#UnassociatedPageListToPortal").find(".filter-component").hide();
                }
                $("body").append("<div class='modal-backdrop fade in'></div>");
            }
        });
    };
    Store.prototype.AppendResponseToPageAsidePanel = function (res) {
        ZnodeBase.prototype.ShowLoader();
        $("#" + 'DivGetUnAssociatedPageSettingListForStore').html('');
        $("#" + 'DivGetUnAssociatedPageSettingListForStore').append(res);
        $("#" + 'DivGetUnAssociatedPageSettingListForStore').slideDown(200);
        $("body").css('overflow', 'hidden');
        ZnodeBase.prototype.HideLoader();
        GridPager.prototype.Init();
    };
    Store.prototype.TestEmailResult = function (response) {
        Endpoint.prototype.TestEmail($("#PortalId").val(), function (res) {
            if (res != "") {
                if (response.status) {
                    $("#divTestEmailPopup").modal("hide");
                    WebSite.prototype.RemovePopupOverlay();
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(response.message, 'success', isFadeOut, fadeOutTime);
                }
                else {
                    $("#divTestEmailPopup").modal("show");
                    $("#errorMsg").show();
                    $("#divTestEmailPopup").html(res);
                    $("#errorMsg").removeClass("success-msg");
                    $("#errorMsg").addClass("error-msg");
                    $("#errorMsg").text(response.message);
                }
            }
        });
    };
    Store.prototype.ValidateStoreDomainName = function () {
        var isValid = true;
        if ($("#aside-popup-panel #DomainName").val() != '') {
            Endpoint.prototype.IsDomainNameExist($("#aside-popup-panel #DomainName").val(), $("#aside-popup-panel #DomainId").val(), function (response) {
                if (!response) {
                    $("#aside-popup-panel #DomainName").addClass("input-validation-error");
                    $("#aside-popup-panel #errorSpanDomainName").addClass("error-msg");
                    $("#aside-popup-panel #errorSpanDomainName").text(ZnodeBase.prototype.getResourceByKeyName("AlreadyExistStoreDomainName"));
                    $("#aside-popup-panel #errorSpanDomainName").show();
                    isValid = false;
                    ZnodeBase.prototype.HideLoader();
                }
            });
        }
        return isValid;
    };
    Store.prototype.DeleteMultipleStore = function (control) {
        var portalId = this.GetCheckedStoreCode("StoreCode");
        if (portalId.length > 0) {
            Endpoint.prototype.DeleteStoreByStoreCode(portalId, function (response) {
                DynamicGrid.prototype.RefreshGridOndelete(control, response);
            });
        }
    };
    Store.prototype.GetCheckedStoreCode = function (columnName) {
        var storeControl = $('#grid input:checked').parent().parent() ? $('#grid input:checked').parent().parent().find('label[data-columnname=' + columnName + ']') : "";
        var storeCodes = "";
        if (storeControl) {
            for (var index = 0; index < storeControl.length; index++) {
                var element = storeControl[index];
                storeCodes = storeCodes.concat(element['textContent'], ',');
            }
            return storeCodes.slice(0, -1);
        }
        return storeCodes;
    };
    Store.prototype.ViewPortalCatalog = function () {
        var publishCatalogId = $('#hdnPublishCatalogId :selected').val();
        var url = window.location.protocol + "//" + window.location.host + "/Store/ViewPortalCatalog?PublishCatalogId=" + publishCatalogId + "&portalId=" + $("#PortalId").val();
        window.open(url, '_blank');
    };
    Store.prototype.EnableDomain = function () {
        var domainIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (domainIds.length > 0) {
            ZnodeBase.prototype.ShowLoader();
            Endpoint.prototype.EnableDisableDomain($("#PortalId").val(), domainIds, true, function (res) {
                ZnodeBase.prototype.HideLoader();
                window.location.href = window.location.protocol + "//" + window.location.host + "/Store/UrlList?portalId=" + $("#PortalId").val();
            });
        }
        else {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        }
    };
    Store.prototype.DisableDomain = function () {
        var domainIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (domainIds.length > 0) {
            ZnodeBase.prototype.ShowLoader();
            Endpoint.prototype.EnableDisableDomain($("#PortalId").val(), domainIds, false, function (res) {
                ZnodeBase.prototype.HideLoader();
                window.location.href = window.location.protocol + "//" + window.location.host + "/Store/UrlList?portalId=" + $("#PortalId").val();
            });
        }
        else {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        }
    };
    Store.prototype.ShowAllRightLeftButton = function () {
        var left = $("#SelectedCities li").length;
        var right = $("#UnAssignedListBox li").length;
        if (left < 1) {
            $("#btnAllMoveLeft").addClass("not-active");
            $("#btnMoveLeft").addClass("not-active");
        }
        if (right < 1) {
            $("#btnAllMoveRight").addClass("not-active");
            $("#btnMoveRight").addClass("not-active");
        }
    };
    Store.prototype.CopyStore = function () {
        $("#grid tbody tr td").find(".z-copy").on("click", function (e) {
            e.preventDefault();
            var portalId = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            Endpoint.prototype.CopyStore(portalId, function (res) {
                if (res != "") {
                    $("#divCopyStorePopup").modal("show");
                    $("#divCopyStorePopup").html(res);
                }
                else
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorMessage"), 'error', isFadeOut, fadeOutTime);
            });
        });
    };
    Store.prototype.CopyStoreResult = function (response) {
        if (response.status) {
            Endpoint.prototype.GetStoreList(function (res) {
                $("#divCopyStorePopup").html(res);
                $("#divCopyStorePopup").modal("hide");
            });
        }
        $("#divCopyStorePopup").modal("hide");
        WebSite.prototype.RemovePopupOverlay();
        window.location.href = window.location.protocol + "//" + window.location.host + "/Store/List";
    };
    Store.prototype.DeleteMultipleUrl = function (control) {
        var urlIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (urlIds.length > 0) {
            Endpoint.prototype.DeleteUrl(urlIds, function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.DeleteMultiplePortalProfile = function (control) {
        var portalProfileIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (portalProfileIds.length > 0) {
            Endpoint.prototype.DeletePortalProfile(portalProfileIds, function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.BindCurrencyInfo = function () {
        if ($("#ddlCurrencyType").length > 0) {
            if ($('#ddlCurrencyType').val() == 0) {
                Document.prototype.write("Please select Currency");
            }
            Endpoint.prototype.GetCurrencyInfo($("#ddlCurrencyType").val(), $("#OldCurrencyId").val(), ($("#ddlCultureType").val() == null) ? 0 : $("#ddlCultureType").val(), function (response) {
                var culture;
                if (response.Culture.length > 0) {
                    $.each(response.Culture, function (e, v) {
                        if (culture == undefined)
                            if (v.Value == $("#ddlCultureType").val())
                                culture = "<option selected='selected' value=" + v.Value + ">" + v.Text + "</option>";
                            else
                                culture = "<option value=" + v.Value + ">" + v.Text + "</option>";
                        else if (v.Value == $("#ddlCultureType").val())
                            culture = culture + "<option selected='selected' value=" + v.Value + ">" + v.Text + "</option>";
                        else
                            culture = culture + "<option value=" + v.Value + ">" + v.Text + "</option>";
                    });
                }
                else {
                    culture = "<option value = 0></option>";
                }
                $("#ddlCultureType").html(culture);
                $("#txtCurrencySuffix").val(response.CurrencySuffix);
                $("#txtCurrencyPreviewVal").val(response.CurrencyPreview);
            });
        }
    };
    Store.prototype.BindCultureInfo = function () {
        if ($('#ddlCultureType').length > 0) {
            if ($('#ddlCultureType').val() == 0) {
                Document.prototype.write("Please select Culture");
            }
            else {
                Endpoint.prototype.GetCultureInfo($("#ddlCurrencyType").val(), ($("#ddlCultureType").val() == null) ? 0 : $("#ddlCultureType").val(), function (response) {
                    var culture;
                    if (response.Culture.length > 0) {
                        $.each(response.CultureList, function (e, v) {
                            culture = culture + "<option value=" + v.Value + ">" + v.Text + "</option>";
                        });
                    }
                    else {
                        culture = culture + "<option value = null></option>";
                    }
                    $("#ddlCultureType").html(culture);
                    $("#txtCurrencySuffix").val(response.CurrencySuffix);
                    $("#txtCurrencyPreviewVal").val(response.CurrencyPreview);
                });
            }
        }
    };
    Store.prototype.SetDefaultOrderState = function (RequiresManualApproval, pendingApproval) {
        if ($(RequiresManualApproval).prop("checked") == true) {
            $('#ddlOrderStatus').append('<option value="50" selected=selected>' + pendingApproval + '</option>');
            $('#ddlOrderStatus').attr("disabled", true);
        }
        else {
            $('#ddlOrderStatus').attr("disabled", false);
            $('#ddlOrderStatus').find("option[value='50']").remove();
        }
    };
    Store.prototype.SetRequiresManualApproval = function (pendingApproval, pendingApprovalText) {
        if (pendingApproval == "50") {
            $("#IsMannualApproval").prop("checked", "checked");
            Store.prototype.SetDefaultOrderState($("#IsMannualApproval"), pendingApprovalText);
        }
    };
    Store.prototype.GetValueOnFormPost = function () {
        $("#frmStore").on("submit", function () {
            $("#OrderStatusId").val($("#ddlOrderStatus").val());
        });
    };
    Store.prototype.GetWarehouses = function () {
        var warehouseId = $("#warehouseList option:selected").val();
        var portalId = (parseInt($("#PortalId").val(), 10));
        Endpoint.prototype.GetWarehouses(portalId, warehouseId, function (res) {
            $("#warehouse-manage").html(res);
            ZnodeBase.prototype.activeAsidePannel();
        });
    };
    Store.prototype.AssociateWarehouses = function (portalId, backURL) {
        if ($("#warehouseList").val() == undefined || $("#warehouseList").val() == null || $("#warehouseList").val() == "") {
            $("#Error-Warehouse").html(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneWarehouse"));
        }
        else {
            var alternateWarehouseIds = [];
            var warehouseId = (parseInt($("#WarehouseId").val(), 10));
            $("#UnAssignedListBox").find("li").each(function () {
                if ($("#UnAssignedListBox").find("li").length > 0) {
                    var id = $(this).attr("data-value");
                    alternateWarehouseIds.push(id);
                }
            });
            if (typeof (backURL) != "undefined")
                $.cookie("_backURL", backURL, { path: '/' });
            Endpoint.prototype.AssociateWarehouseToStore(portalId, warehouseId, alternateWarehouseIds.join(","), function (response) {
                window.location.href = window.location.protocol + "//" + window.location.host + "/Store/GetAssociatedWarehouseList?portalId=" + portalId;
            });
        }
    };
    Store.prototype.EditPortalCatalog = function () {
        $("#grid tbody tr td").find(".z-edit").click(function (e) {
            e.preventDefault();
            var portalCatalogId = $(this).attr("data-parameter").split('&')[0].split('=')[1];
            Endpoint.prototype.EditPortalCatalog(portalCatalogId, function (res) {
                if (res != "") {
                    $("#divPortalCatalog").html(res);
                    $("#divPortalCatalog").modal("show");
                }
                else
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorMessage"), 'error', isFadeOut, fadeOutTime);
            });
        });
    };
    Store.prototype.EditPortalCatalogResult = function (response) {
        if (response.status) {
            Endpoint.prototype.GetPortalAssociatedCatalog(response.portalId, function (res) {
                $("#ReplaceAsidePannelContentDiv").html(res);
            });
        }
        $("#divPortalCatalog").modal("hide");
        ZnodeBase.prototype.RemovePopupOverlay();
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(response.message, response.status ? 'success' : 'error', true, fadeOutTime);
    };
    Store.prototype.listbox_move = function (listID, direction) {
        var selValue = $("#" + listID + " .selected").attr("data-value");
        var selText = $("#" + listID + " .selected").html();
        var selId = $("#" + listID + " .selected").attr("data-id");
        var mustShow = $("#" + listID + " .selected").attr("data-mustshow");
        var datatype = $("#" + listID + " .selected").attr("data-datatype");
        if (selValue != undefined && selId != undefined) {
            var dynamicHtml = "<li data-id='" + selId + "' title='" + selText + "' data-datatype='" + datatype + "' data-mustshow='" + mustShow + "' data-value='" + selValue + "'>" + selText + "</li>";
            if (direction == "First") {
                $("#" + listID).prepend(dynamicHtml);
            }
            else if (direction == "Last") {
                $("#" + listID).append(dynamicHtml);
            }
            else if (direction == "down") {
                var dynamicHtmlTest = $("#" + listID + " .selected").next("li");
                if (dynamicHtmlTest.length != 0) {
                    $("#" + listID + " .selected").next("li").after(dynamicHtml);
                }
                else {
                    return false;
                }
            }
            else {
                var dynamicHtmlTest = $("#" + listID + " .selected").prev("li");
                if (dynamicHtmlTest.length != 0) {
                    $("#" + listID + " .selected").prev("li").before(dynamicHtml);
                }
                else {
                    return false;
                }
            }
            $("#" + listID + " .selected").remove();
            $("#" + listID + " li[data-id='" + selId + "']").addClass("selected");
        }
    };
    Store.prototype.LoadCatalogTree = function () {
        $("#Catalog_Tree").jstree({
            'core': {
                'multiple': false,
                'data': {
                    "url": function (node) {
                        var nodeId = "";
                        var url = "";
                        var portalCatalogId = $("#PublishCatalogId").val();
                        if (node.id == "#") {
                            url = '/Store/GetCatalogTree?portalCatalogId=' + portalCatalogId + "&publishCategoryId=-1";
                        }
                        else if (node.id == "0") {
                            url = '/Store/GetCatalogTree?portalCatalogId=' + portalCatalogId + "&publishCategoryId=0";
                        }
                        else {
                            url = '/Store/GetCatalogTree?portalCatalogId=' + portalCatalogId + "&publishCategoryId=" + node.id;
                        }
                        return url;
                    },
                    "success": function (new_data) {
                        return eval(new_data);
                    }
                }
            },
            //TODO Need to implement DB search
            //"search": {
            //    "case_insensitive": true,
            //    "ajax": {
            //        "url": '/Store/Demo',
            //        "success": function (searchresult) {
            //            var data = ["2", "5"];
            //            return data;
            //        }
            //    }
            //},
            "plugins": ['state', 'search', "themes", "json_data", "wholerow"]
        });
    };
    Store.prototype.DisplayTreeNodeInfo = function () {
        $('#Catalog_Tree').on("select_node.jstree", function (e, data) {
            var url;
            if (data.node.id == 0) {
                url = "/Store/GetPublishCatalogDetails?publishCatalogId=" + $("#PublishCatalogId").val();
            }
            else if (data.node.id.indexOf("_product") > -1) {
                var id = data.node.id.split('_');
                url = "/Store/GetPublishProductDetails?publishProductId=" + id[0] + "&portalId=" + $("#PortalId").val();
            }
            else {
                url = "/Store/GetPublishCategoryDetails?publishCategoryId=" + data.node.id;
            }
            Endpoint.prototype.GetPublishInfo(url, function (response) {
                $("#DisplayPublishInfo").html(response);
            });
        });
    };
    Store.prototype.SearchJstreeNode = function () {
        var timeout = 0;
        $('#TreeSearch').keyup(function () {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var value = $('#TreeSearch').val();
                $('#Catalog_Tree').jstree(true).search(value);
            }, 250);
        });
    };
    Store.prototype.IsDefaultWarehouse = function () {
        if ($("#IsDefaultWarehouse").is(":checked")) {
            $('.lblShippingOrigin').prop("disabled", true);
        }
        else {
            $('.lblShippingOrigin').prop('disabled', false);
        }
    };
    ;
    Store.prototype.DeleteStoreLocator = function (control) {
        var StoreLocationCode = this.GetCheckedStoreCode("StoreLocationCode");
        if (StoreLocationCode) {
            Endpoint.prototype.DeleteStoreLocatorByCode(StoreLocationCode, function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.DefaultSubmit = function (SelectedIdArr, Controller, Action, Callback) {
        var action = "SetDefault";
        var ids = [];
        ids = MediaManagerTools.prototype.unique();
        if (ids.length == 0)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        else if (ids.length > 1)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAnyOneToSetAsDefault"), 'error', isFadeOut, fadeOutTime);
        else {
            if (Action == "AssociateCountries")
                this.submitDefaultForCountry(ids, action, Controller, Action, Callback);
            else
                this.submit(ids, action, Controller, Action, Callback);
        }
    };
    Store.prototype.submitDefaultForCountry = function (SelectedIdArr, action, Controller, Action, Callback) {
        var countryCode = Store.prototype.GetMultipleValuesOfGridColumn('Country Code');
        var portalCountryId = parseInt(SelectedIdArr.toString());
        var isDefault = true;
        Endpoint.prototype.AssociateCountriesForStore($("#PortalId").val(), countryCode, isDefault, portalCountryId, function (res) {
            $("#associateCountryList").hide(700);
            window.location.href = window.location.protocol + "//" + window.location.host + "/Store/GetAssociatedCountryList?portalId=" + $('#PortalId').val();
        });
    };
    Store.prototype.ActiveSubmit = function (SelectedIdArr, Controller, Action, Callback) {
        var action = "SetActive";
        var ids = [];
        ids = MediaManagerTools.prototype.unique();
        if (ids.length == 0)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        else {
            this.submit(ids, action, Controller, Action, Callback);
        }
    };
    Store.prototype.DeActivateSubmit = function (SelectedIdArr, Controller, Action, Callback) {
        var action = "SetDeActive";
        var ids = [];
        ids = MediaManagerTools.prototype.unique();
        if (ids.length == 0)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        else {
            //ajax call.
            this.submit(ids, action, Controller, Action, Callback);
        }
    };
    Store.prototype.submit = function (SelectedIdArr, action, Controller, Action, Callback) {
        this._Model = { "LocaleId": SelectedIdArr.toString(), "Action": action, "PortalId": $("#hdnPortalID").val() };
        var url = "/" + Controller + "/" + Action;
        this.AssociateLocale(url, this._Model, Controller, Action, Callback);
    };
    Store.prototype.AssociateLocale = function (url, model, controller, Action, callback) {
        Endpoint.prototype.AssociateLocales(url, model, function (data) {
            if (data != "") {
                window.location.href = "/Store/LocaleList?portalId=" + $("#hdnPortalID").val();
            }
        });
    };
    Store.prototype.BindCSSBasedOnThemeId = function () {
        $("span[data-valmsg-for='CMSThemeCSSId']").html("");
        var selectedTheme = $("#ddlTheme").val();
        if (selectedTheme == 0 && selectedTheme == "") {
            $('#ddlCSS').children('option:not(:first)').remove();
            return false;
        }
        Endpoint.prototype.GetCSSListForStore(selectedTheme, function (response) {
            $('#ddlCSS').children('option:not(:first)').remove();
            for (var i = 0; i < response.length; i++) {
                var opt = new Option(response[i].Text, response[i].Value);
                $('#ddlCSS').append(opt);
            }
        });
    };
    Store.prototype.GetApprovalList = function () {
        var selectedApprovalTypeId = $("#ddlPortalApprovalTypes").val();
        var selectedApprovalType = $("#ddlPortalApprovalTypes option:selected").text();
        var portalId = $("#portalId").val();
        if (selectedApprovalTypeId == 0 && selectedApprovalTypeId == "") {
            return false;
        }
        Endpoint.prototype.GetApprovalList(portalId, selectedApprovalType, selectedApprovalTypeId, function (response) {
            $('#content-to-dispaly-in-portal-approval-table').html(response.html);
        });
    };
    Store.prototype.ValidateCSS = function () {
        var selectedTheme = $("#ddlTheme").val();
        if (selectedTheme == 0 && selectedTheme == "") {
            $("span[data-valmsg-for='CMSThemeCSSId']").html("Please select theme first.");
            $("span[data-valmsg-for='CMSThemeCSSId']").attr("class", "field-validation-error");
            return true;
        }
    };
    Store.prototype.TestAvalaraConnection = function () {
        ZnodeBase.prototype.ShowLoader();
        $.ajax({
            url: "/Store/TestAvalaraConnection",
            data: $("#frmEditTax").serialize(),
            type: 'POST',
            success: function (data) {
                Store.prototype.HideLoader();
                if (!data.HasError) {
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(data.Message, "success", isFadeOut, fadeOutTime);
                }
                else {
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(data.Message, "error", isFadeOut, fadeOutTime);
                }
            }
        });
    };
    Store.prototype.AssociateCountries = function () {
        var countryCode = DynamicGrid.prototype.GetMultipleSelectedIds();
        var portalId = $('#PortalId').val();
        if (countryCode.length > 0) {
            Endpoint.prototype.AssociateCountriesForStore(portalId, countryCode, false, 0, function (res) {
                $("#associateCountryList").hide(700);
                window.location.href = window.location.protocol + "//" + window.location.host + "/Store/GetAssociatedCountryList?portalId=" + portalId;
            });
        }
        else {
            $('#associatedCountryId').show();
        }
    };
    Store.prototype.GetMultipleValuesOfGridColumn = function (columnName) {
        var column = [];
        var value = "";
        var index = 0;
        $("#grid").find("tr.grid-header").find("th").each(function () {
            column.push($(this));
        });
        for (var i = 0; i < column.length; i++) {
            if (column[i].text().trim() == columnName) {
                index = i;
                break;
            }
        }
        $("#grid").find("tr").each(function () {
            if ($(this).find(".grid-row-checkbox").length > 0) {
                if ($(this).find(".grid-row-checkbox").is(":checked")) {
                    value = value + $(this).find("td")[index].innerHTML + ",";
                }
            }
        });
        return value.substr(0, value.length - 1);
    };
    Store.prototype.GetUnassociatedCountryList = function (portalId) {
        DynamicGrid.prototype.ClearCheckboxArray();
        ZnodeBase.prototype.ShowLoader();
        Endpoint.prototype.GetUnassociatedCountryList(portalId, function (res) {
            if (res != null && res != "") {
                $("#associateCountryList").html(res);
                $("#associateCountryList").show(700);
                $("body").css('overflow', 'hidden');
                ZnodeBase.prototype.HideLoader();
                $("body").append("<div class='modal-backdrop fade in'></div>");
            }
        });
    };
    Store.prototype.UnAssociateCountries = function (control) {
        var portalCountryId = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (portalCountryId.length > 0) {
            Endpoint.prototype.RemoveAssociatedCountries(portalCountryId, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.EditAssociatedPriceListPrecedenceForStore = function () {
        $("#grid tbody tr td").find(".z-edit").click(function (e) {
            e.preventDefault();
            var listName = $(this).attr("data-parameter").split('&')[1].split('=')[1];
            var priceListId = parseInt($(this).attr("data-parameter").split('&')[0].split('=')[1]);
            Endpoint.prototype.EditAssociatedPriceListPrecedence(0, priceListId, $('#PortalId').val(), listName, function (res) {
                if (!res.status) {
                    $("#priceListPrecedence").modal("hide");
                    return false;
                }
                $("#priceListPrecedence").modal("show");
                $("#priceListPrecedence").html(res.data.html);
            });
        });
    };
    Store.prototype.EditAssociatedPriceListPrecedenceForProfile = function () {
        $("#grid tbody tr td").find(".z-edit").click(function (e) {
            e.preventDefault();
            var listName = $(this).attr("data-parameter").split('&')[1].split('=')[1];
            var priceListProfileId = parseInt($(this).attr("data-parameter").split('&')[0].split('=')[1]);
            Endpoint.prototype.EditAssociatedPriceListPrecedence(priceListProfileId, $('#PriceListId').val(), $('#PortalId').val(), listName, function (res) {
                if (!res.status) {
                    $("#priceListPrecedence").modal("hide");
                    return false;
                }
                $("#priceListPrecedence").modal("show");
                $("#priceListPrecedence").html(res.data.html);
            });
        });
    };
    Store.prototype.EditAssociatedPriceListPrecedenceResultForStore = function (data) {
        $("#priceListPrecedence").modal("hide");
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(data.Message, data.Status ? 'error' : 'success', isFadeOut, fadeOutTime);
        ZnodeBase.prototype.RemovePopupOverlay();
        Store.prototype.AssociatedStoresList();
    };
    Store.prototype.EditAssociatedPriceListPrecedenceResultForProfile = function (data) {
        $("#priceListPrecedence").modal("hide");
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(data.Message, data.Status ? 'error' : 'success', isFadeOut, fadeOutTime);
        ZnodeBase.prototype.RemovePopupOverlay();
        Store.prototype.AssociatedProfilesList();
    };
    Store.prototype.AssociatedStoresList = function () {
        Endpoint.prototype.GetAssociatedPriceListForStore($("#PortalId").val(), function (response) {
            $("#associateStore").html('');
            $("#associateStore").html(response);
            GridPager.prototype.UpdateHandler();
        });
    };
    Store.prototype.AssociatedProfilesList = function () {
        Endpoint.prototype.GetAssociatedPriceListForProfile($("#PortalId").val(), $("#ProfileId").val(), function (response) {
            $("#associateProfile").html('');
            $("#associateProfile").html(response);
            GridPager.prototype.UpdateHandler();
        });
    };
    Store.prototype.PreviewStore = function (zpreview) {
        if (zpreview.attr("href") === "?DomainUrl=#") {
            zpreview.attr("href", "#");
        }
        else {
            zpreview.attr('target', '_blank');
        }
        var url = zpreview.attr("href");
        if (url.indexOf("?DomainUrl=") >= 0) {
            zpreview.attr("href", url.replace("?DomainUrl=", "//"));
        }
    };
    Store.prototype.ValidatePrecedanceField = function (object) {
        var isValid = true;
        var regex = new RegExp('^\\d{0,}?$');
        if (isNaN($(object).val())) {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("RequiredNumericValue"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else if (!regex.test($(object).val()) || $(object).val() == 0) {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("DisplayOrderRange"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else if ($(object).val() == '') {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("PrecedenceIsRequired"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else {
            $(object).remove("input-validation-error");
            $(object).removeClass("input-validation-error");
            isValid = true;
        }
        return isValid;
    };
    Store.prototype.ValidatePortalBrandDisplayOrderField = function (object) {
        var isValid = true;
        var regex = new RegExp('^\\d{0,}?$');
        if (isNaN($(object).val())) {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("RequiredNumericValue"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else if (!regex.test($(object).val()) || $(object).val() == 0) {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("DisplayOrderRange"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else if ($(object).val() == '') {
            $(object).addClass("input-validation-error");
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorRequiredDisplayOrder"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else {
            $(object).remove("input-validation-error");
            $(object).removeClass("input-validation-error");
            isValid = true;
        }
        return isValid;
    };
    Store.prototype.ValidateDomainNameField = function (object) {
        var isValid = true;
        if ($(object).val() == '') {
            $(object).addClass("input-validation-error");
            if ($(object).val() == '')
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("DomainNameIsRequired"), 'error', isFadeOut, fadeOutTime);
            isValid = false;
        }
        else {
            $(object).remove("input-validation-error");
            $(object).removeClass("input-validation-error");
            isValid = true;
        }
        return isValid;
    };
    Store.prototype.AssociateTaxClass = function (portalId) {
        ZnodeBase.prototype.ShowLoader();
        var linkTaxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds('ZnodePortalTaxClassAssociatedList');
        if (linkTaxClassIds.length > 0)
            Endpoint.prototype.AssociateTaxClassListToStore(linkTaxClassIds, portalId, function (res) {
                Endpoint.prototype.StoreAssociatedTaxClassList(portalId, function (response) {
                    $("#ZnodePortalTaxClassList").html('');
                    $("#ZnodePortalTaxClassList").html(response);
                    GridPager.prototype.UpdateHandler();
                });
                $("#DivGetUnAssociatedTaxListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                DynamicGrid.prototype.ClearCheckboxArray();
                ZnodeBase.prototype.HideLoader();
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedTaxClass').show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Store.prototype.UnAssociateTaxClass = function (control) {
        var taxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (taxClassIds.length > 0) {
            Endpoint.prototype.UnAssociateTaxClass(taxClassIds, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.AssociatePortalBrand = function (portalId) {
        ZnodeBase.prototype.ShowLoader();
        var linkBrandIds = DynamicGrid.prototype.GetMultipleSelectedIds('ZnodePortalBrandAssociatedList');
        if (linkBrandIds.length > 0)
            Endpoint.prototype.AssociateBrandsToPortal(linkBrandIds, portalId, function (res) {
                Endpoint.prototype.GetStoreAssociatedBrandList(portalId, function (response) {
                    $("#ZnodePortalBrandList").html('');
                    $("#ZnodePortalBrandList").html(response);
                    GridPager.prototype.UpdateHandler();
                });
                $("#DivGetUnAssociatedBrandListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                DynamicGrid.prototype.ClearCheckboxArray();
                ZnodeBase.prototype.HideLoader();
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedPortalBrand').show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Store.prototype.UnAssociatePortalBrand = function (control) {
        var linkBrandIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (linkBrandIds.length > 0) {
            Endpoint.prototype.UnAssociateBrandsFromPortal(linkBrandIds, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.GetUnassociatedShipping = function (portalId) {
        DynamicGrid.prototype.ClearCheckboxArray();
        ZnodeBase.prototype.BrowseAsidePoupPanel('/Store/GetUnAssociatedShippingList?portalId=' + portalId, 'divUnassociatedShippingListPopup');
    };
    Store.prototype.AssociateShipping = function (portalId) {
        var shippingIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (shippingIds.length > 0) {
            Endpoint.prototype.AssociateShippingToStore(portalId, shippingIds, function (res) {
                if (res.status) {
                    Endpoint.prototype.GetAssociatedShippingListToStore(portalId, function (res) {
                        DynamicGrid.prototype.ClearCheckboxArray();
                        $("#ZnodeAssociatedShippingListToPortal").html(res);
                    });
                }
                $("#divUnassociatedShippingListPopup").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? 'success' : 'error', isFadeOut, fadeOutTime);
            });
            ZnodeBase.prototype.RemoveAsidePopupPanel();
        }
        else {
            $("#divAssociatedPortalShippingError").show();
        }
    };
    Store.prototype.UnAssociateAssociatedShipping = function (control) {
        var shippingId = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (shippingId.length > 0) {
            Endpoint.prototype.UnAssociateAssociatedShippingToStore(shippingId, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.SetPortalDefaultTax = function () {
        var taxClassIds = MediaManagerTools.prototype.unique();
        if (taxClassIds.length == 0)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAtleastOneRecord"), 'error', isFadeOut, fadeOutTime);
        else if (taxClassIds.length > 1)
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("SelectAnyOneToSetAsDefault"), 'error', isFadeOut, fadeOutTime);
        else {
            Endpoint.prototype.SetPortalDefaultTax(taxClassIds.toString(), $("#PortalId").val(), function (data) {
                window.location.href = "/Store/TaxList?portalId=" + $("#PortalId").val();
            });
        }
    };
    Store.prototype.AssociatePaymentSetting = function (portalId) {
        ZnodeBase.prototype.ShowLoader();
        var linkTaxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds('ZnodePayment');
        if (linkTaxClassIds.length > 0)
            Endpoint.prototype.AssociatePaymentSetting(linkTaxClassIds, portalId, function (res) {
                Endpoint.prototype.GetAssociatedPaymentList(portalId, function (response) {
                    $("#AssociatedPaymentListToPortal").html('');
                    $("#AssociatedPaymentListToPortal").html(response);
                    GridPager.prototype.UpdateHandler();
                });
                $("#DivGetUnAssociatedPaymentSettingListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                DynamicGrid.prototype.ClearCheckboxArray();
                ZnodeBase.prototype.HideLoader();
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedTaxClass').show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Store.prototype.AssociatePaymentSettingForOffline = function (portalId) {
        ZnodeBase.prototype.ShowLoader();
        var linkTaxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds('ZnodePayment');
        if (linkTaxClassIds.length > 0)
            Endpoint.prototype.AssociateOfflinePaymentSetting(linkTaxClassIds, portalId, function (res) {
                Endpoint.prototype.GetAssociatedInvoiceManagementPaymentList(portalId, function (response) {
                    $("#AssociatedPaymentListToPortal").html('');
                    $("#AssociatedPaymentListToPortal").html(response);
                    GridPager.prototype.UpdateHandler();
                });
                $("#DivGetUnAssociatedPaymentSettingListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                DynamicGrid.prototype.ClearCheckboxArray();
                ZnodeBase.prototype.HideLoader();
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedTaxClass').show();
            ZnodeBase.prototype.HideLoader();
        }
    };
    Store.prototype.AssociateSortSetting = function (portalId) {
        var linkTaxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (linkTaxClassIds.length > 0)
            Endpoint.prototype.AssociateSortSetting(linkTaxClassIds, portalId, function (res) {
                Endpoint.prototype.GetAssociatedSortList(portalId, function (response) {
                    $("#AssociatedSortListToPortal").html('');
                    $("#AssociatedSortListToPortal").html(response);
                    DynamicGrid.prototype.ClearCheckboxArray();
                });
                $("#DivGetUnAssociatedSortSettingListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedSortClass').show();
        }
    };
    Store.prototype.AssociatePageSetting = function (portalId) {
        var linkTaxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (linkTaxClassIds.length > 0)
            Endpoint.prototype.AssociatePageSetting(linkTaxClassIds, portalId, function (res) {
                Endpoint.prototype.GetAssociatedPageList(portalId, function (response) {
                    $("#AssociatedPageListToPortal").html('');
                    $("#AssociatedPageListToPortal").html(response);
                    DynamicGrid.prototype.ClearCheckboxArray();
                });
                $("#DivGetUnAssociatedPageSettingListForStore").hide(700);
                ZnodeBase.prototype.RemovePopupOverlay();
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? "success" : "error", isFadeOut, fadeOutTime);
                DynamicGrid.prototype.ClearCheckboxArray();
                ZnodeBase.prototype.RemoveAsidePopupPanel();
            });
        else {
            $('#associatedPageClass').show();
        }
    };
    Store.prototype.RemoveAssociatedSortSetting = function (control) {
        var taxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (taxClassIds.length > 0) {
            Endpoint.prototype.RemoveAssociatedSortSetting(taxClassIds, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.RemoveAssociatedPageSetting = function (control) {
        var taxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (taxClassIds.length > 0) {
            Endpoint.prototype.RemoveAssociatedPageSetting(taxClassIds, $("#PortalId").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    Store.prototype.RemoveAssociatedPaymentSetting = function (control) {
        var taxClassIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        if (taxClassIds.length > 0) {
            Endpoint.prototype.RemoveAssociatedPaymentSetting(taxClassIds, $("#PortalId").val(), $("#IsUsedForOfflinePayment").val(), function (res) {
                DynamicGrid.prototype.RefreshGridOndelete(control, res);
            });
        }
    };
    //This method is used to get publish catalog list on aside panel
    Store.prototype.GetCatalogList = function () {
        ZnodeBase.prototype.BrowseAsidePoupPanel('/Store/GetCatalogList', 'divCataloglistPopup');
    };
    //This method is used to get publish catalog list on aside panel
    Store.prototype.GetPortalList = function () {
        ZnodeBase.prototype.BrowseAsidePoupPanel('/StoreLocator/GetPortalList', 'divStorePopupPanel');
    };
    //This method is used to select catalog from fast select and show it on textbox
    Store.prototype.OnSelectPubCatalogAutocompleteDataBind = function (item) {
        if (item != undefined && item.Id > 0) {
            var catalogName = item.text;
            var publishCatalogId = item.Id;
            $('#txtCatalogName').val(catalogName);
            $('#hdnPublishCatalogId').val(publishCatalogId);
            $("#errorRequiredCatalog").text("").removeClass("field-validation-error").hide();
            $("#txtCatalogName").parent("div").removeClass('input-validation-error');
        }
    };
    //This method is used to select catalog from list and show it on textbox
    Store.prototype.GetCatalogDetail = function () {
        $("#ZnodeStoreCatalog").find("tr").click(function () {
            var catalogName = $(this).find("td[class='catalogcolumn']").text();
            var publishProductId = $(this).find("td")[0].innerHTML;
            $('#txtCatalogName').val(catalogName);
            $('#hdnPublishCatalogId').val(publishProductId);
            $("#errorRequiredCatalog").text("").removeClass("field-validation-error").hide();
            $("#txtCatalogName").removeClass('input-validation-error');
            $('#divCataloglistPopup').hide(700);
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    //validation for store textbox
    Store.prototype.ValidateForStore = function () {
        if ($("#txtPortalName").val() == "") {
            $("#errorRequiredStore").text('').text(ZnodeBase.prototype.getResourceByKeyName("ErrorSelectPortal")).addClass("field-validation-error").show();
            $("#txtPortalName").parent("div").addClass('input-validation-error');
            return false;
        }
        return true;
    };
    //To Do: To bind store id to hidden feild
    Store.prototype.OnSelectStoreAutocompleteDataBind = function (item) {
        if (item != undefined && item.Id > 0) {
            var portalName = item.text;
            var portalId = item.Id;
            if ($('#hdnPortalId').val() != undefined) {
                $("#hdnPortalId").val(portalId);
            }
            if ($('#PortalId').val() != undefined) {
                $('#PortalId').val(portalId);
            }
            $('#txtPortalName').val(portalName);
            $("#errorRequiredStore").text("").removeClass("field-validation-error").hide();
            $("#txtPortalName").parent("div").removeClass('input-validation-error');
        }
    };
    //This method is used to select portal from list and show it on textbox
    Store.prototype.GetPortalDetail = function () {
        $("#grid").find("tr").click(function () {
            var portalName = $(this).find("td[class='storecolumn']").text();
            var portalId = $(this).find("td")[0].innerHTML;
            $('#txtPortalName').val(portalName);
            $('#hdnPortalId').val(portalId);
            $("#errorRequiredStore").text("").removeClass("field-validation-error").hide();
            $("#txtPortalName").removeClass('input-validation-error');
            $('#divStorePopupPanel').hide(700);
            ZnodeBase.prototype.RemovePopupOverlay();
        });
    };
    Store.prototype.GetPortalPublishStatus = function (zViewAnchor) {
        zViewAnchor.attr("href", "#");
        var portalId = $(zViewAnchor).attr("data-parameter").split('&')[0].split('=')[1];
        var storeName = $(zViewAnchor).attr("data-parameter").split('&')[1].split('=')[1];
        ZnodeBase.prototype.BrowseAsidePoupPanel('/Store/GetPortalPublishStatus?portalId=' + portalId + '&storeName=' + storeName, 'divPortalPublishStatusList');
    };
    Store.prototype.CloseUnassociateCountriesPopup = function () {
        ZnodeBase.prototype.CancelUpload('associateCountryList');
        _gridContainerName = "#ZnodePortalCountry";
    };
    Store.prototype.PublishStorePopup = function (zPublishAnchor) {
        zPublishAnchor.attr("href", "#");
        $("#HdnStoreId").val($(zPublishAnchor).attr("data-parameter").split('&')[0].split('=')[1]);
        Store.prototype.ClearEnableCheckboxChecked();
        $("#PublishStore").modal('show');
    };
    Store.prototype.PublishStoreSetting = function () {
        var publishStateFormData = 'NONE';
        var publishContentFormData = '';
        if ($('#radBtnPublishState').length > 0)
            publishStateFormData = ZnodeBase.prototype.mergeNameValuePairsToString($('#radBtnPublishState').serializeArray());
        if ($('#chkBxPublishContentChoice').length > 0)
            publishContentFormData = ZnodeBase.prototype.mergeNameValuePairsToString(Store.prototype.GetCheckBoxChekedArrar('chkBxPublishContentChoice', 'chkBxPublishStatesChoice'));
        Endpoint.prototype.PublishStoreSetting($("#HdnStoreId").val(), publishStateFormData, publishContentFormData, function (res) {
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper(res.message, res.status ? 'success' : 'error', isFadeOut, fadeOutTime);
            ZnodeProgressNotifier.prototype.InitiateProgressBar(function () {
                DynamicGrid.prototype.RefreshGridNoNotification($("#ZnodeStore").find("#refreshGrid"));
            });
        });
    };
    Store.prototype.GetCheckBoxChekedArrar = function (contentControl, statesControl) {
        var PublishContentChoice = [];
        $('#' + contentControl).find('input[type=checkbox]:checked').each(function () {
            PublishContentChoice.push({ 'name': $(this).attr('name'), 'value': $(this).val() });
        });
        $('#' + statesControl).find('input[type=checkbox]:checked').each(function () {
            PublishContentChoice.push({ 'name': $(this).attr('name'), 'value': $(this).val() });
        });
        return PublishContentChoice;
    };
    Store.prototype.ShowHideEmailNotifaction = function () {
        $('#enableDisable').toggle();
        if (!($("#EnableToStore").prop('checked'))) {
            $("#OrderAmount").rules("remove", 'required');
            $("#Email").rules("remove", 'required');
        }
        else {
            $("#OrderAmount").rules("add", "required");
            $("#Email").rules("add", 'required');
        }
    };
    Store.prototype.ShowHideValidationEmailNotifaction = function () {
        if ($("#OrderAmount").val() != "" || $("#Email").val() != "") {
            $('#enableDisable').show();
            $("#EnableToStore").prop('checked', true);
        }
        else {
            $('#enableDisable').hide();
            $("#EnableToStore").prop('checked', false);
            $("#OrderAmount").rules("remove", 'required');
            $("#Email").rules("remove", 'required');
        }
    };
    Store.prototype.ValidateEmailNotifaction = function () {
        if (!$("#EnableToStore").prop('checked')) {
            $('#OrderAmount').val('');
            $('#Email').val('');
        }
        if ($("#txtCatalogName").val() == "") {
            $("#errorRequiredCatalog").text('').text(ZnodeBase.prototype.getResourceByKeyName("ErrorSelectCatalog")).addClass("field-validation-error").show();
            $("#txtCatalogName").parent("div").addClass('input-validation-error');
            return false;
        }
        return true;
    };
    Store.prototype.PortalProfileUpdateResult = function () {
        $("[update-container-id='ZnodePortalProfile'] #refreshGrid").click();
    };
    Store.prototype.UrlUpdateResult = function () {
        $("[update-container-id='ZnodeDomain'] #refreshGrid").click();
    };
    Store.prototype.PortalPageListToPortalUpdateResult = function () {
        $("[update-container-id='AssociatedPageListToPortal'] #refreshGrid").click();
    };
    Store.prototype.RefreshGridOnEdit = function () {
        if ($('#ZnodeDomain').length > 0) {
            Store.prototype.UrlUpdateResult();
        }
        else if ($('#ZnodePortalProfile').length > 0) {
            Store.prototype.PortalProfileUpdateResult();
        }
        else if ($('#AssociatedPageListToPortal').length > 0) {
            Store.prototype.PortalPageListToPortalUpdateResult();
        }
    };
    Store.prototype.AddNewArea = function (data) {
        data = 0;
        Store.prototype.GetApproverOrder(data);
        $(".MessageBox").remove();
        $("#_PartialPortalApproverPanel").show();
        $('.table-div').show();
    };
    Store.prototype.AddNewAreaForPayment = function (data, count) {
        data = 0;
        Store.prototype.GetPortalPaymentApproverOrder(data, count);
        $(".MessageBox").remove();
        $("#_PartialPortalApproverPanel_" + count).show();
        $('.table-div').show();
    };
    Store.prototype.GetPortalPaymentApproverOrder = function (data, count) {
        data = 0;
        var portalApprovalId = $("#PortalApprovalId").val();
        Endpoint.prototype.GetApproverOrder(portalApprovalId, function (response) {
            if (response.status) {
                $("#_PartialPortalApproverPanel_" + count).append(response.html);
                Store.prototype.SetAddAreaMappingAttributes(data);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(response.message, 'info', isFadeOut, fadeOutTime);
            }
        });
    };
    Store.prototype.GetApproverOrder = function (data) {
        data = 0;
        var portalApprovalId = $("#PortalApprovalId").val();
        Endpoint.prototype.GetApproverOrder(portalApprovalId, function (response) {
            if (response.status) {
                $("#_PartialPortalApproverPanel").append(response.html);
                Store.prototype.SetAddAreaMappingAttributes(data);
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(response.message, 'info', isFadeOut, fadeOutTime);
            }
        });
    };
    Store.prototype.AddNewPaymentApproverArea = function (data) {
        data = 0;
        var count = parseInt($("#paymentCount").val());
        var portalId = parseInt($("#portalId").val());
        var paymentIdArray = [];
        $('#payment_to_show .multiselect-container .active input').each(function (index, value) {
            if (value['value'] != "multiselect-all") {
                paymentIdArray.push(value['value']);
            }
        });
        Endpoint.prototype.GetPaymentApproverOrder(portalId, count, JSON.stringify(paymentIdArray), function (response) {
            if (response.html.trim() != "") {
                $("#portalpayment").append(response.html);
                $("#paymentCount").val(count + 1);
                $(".MessageBox").remove();
                $("#_PartialPortalPaymentApproverPanel").show();
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorAllPaymentConfigurationsAdded"), 'error', isFadeOut, fadeOutTime);
            }
        });
    };
    Store.prototype.SetAddAreaMappingAttributes = function (data) {
        $(".CancelAreaMapping_" + data + "").show();
        $("#approverUser_" + data + "").attr('enabled', true);
        $("#ApproverUserId" + data + "").attr('enabled', true);
    };
    Store.prototype.GetApproverUsersByPortalId = function () {
        $(".txtApproverUser").autocomplete({
            source: function (request, response) {
                try {
                    var approvalUserIds = "";
                    $(".txtApproverUserId").each(function () {
                        if (jQuery(this).attr("data_userid") == "True") {
                            approvalUserIds += this.value + ",";
                        }
                    });
                    approvalUserIds = approvalUserIds.substring(0, approvalUserIds.length - 1);
                    Endpoint.prototype.GetApproverUsersByPortalId(request.term, $("#portalId").val(), approvalUserIds, function (res) {
                        if (res.length > 0) {
                            var templateValues = new Array();
                            res.forEach(function (templateValue) {
                                if (templateValue != undefined)
                                    templateValues.push(templateValue.TemplateName);
                            });
                            response($.map(res, function (item) {
                                return {
                                    label: item.UserName,
                                    userid: item.UserId,
                                };
                            }));
                        }
                    });
                }
                catch (err) {
                }
            },
            select: function (event, ui) {
                var id = $(this).attr("id");
                var hiddenId = $("#" + id).parent().children("input[type=hidden]").attr("id");
                $("#frmApprovalArea_" + id + " #" + hiddenId).val(ui.item.userid);
                $(this.parentElement).find("#" + hiddenId).val(ui.item.userid);
            },
            focus: function (event, ui) {
                var id = $(this).attr("id");
                var hiddenId = $("#" + id).parent().children("input[type=hidden]").attr("id");
                $("#frmApprovalArea_" + id + " #" + hiddenId).val(ui.item.userid);
            }
        });
    };
    Store.prototype.AreaMapperAddResult = function (data, control) {
        var id = $(control).closest("form").attr("id").split('_')[1];
        ZnodeNotification.prototype.DisplayNotificationMessagesHelper(data.message, data.status ? 'success' : 'error', isFadeOut, fadeOutTime);
        if (data.userApprovalId > 0 && data.status == true) {
            if (parseInt(id) == 0) {
                $("#_PartialPortalApproverPanel").after(data.html);
                $("#_PartialPortalApproverPanel").html("");
            }
            Store.prototype.GetPortalApproverDetails(data);
        }
        else {
            Store.prototype.GetPortalApproverDetails(data);
        }
    };
    Store.prototype.GetPortalApproverDetails = function (data) {
        Endpoint.prototype.GetPortalApproverDetails($("#portalId").val(), function (res) {
            $("#content-to-dispaly-in-portal-approval-table").html(res);
            Store.prototype.AccountShowHideFormAttributes(data.userApprovalId);
        });
    };
    Store.prototype.CancelNewAddAreaMapping = function (data, control) {
        var UserApproverId = data.split('_')[1];
        if (UserApproverId <= 0) {
            $(control).closest("form").remove();
            Store.prototype.GetApproverUsersByPortalId();
        }
        else {
            Endpoint.prototype.GetPortalApproverDetails($("#portalId").val(), function (res) {
                $("#content-to-dispaly-in-portal-approval-table").html(res);
            });
        }
    };
    //Remove Payment Configuration Area
    Store.prototype.CancelPaymentConfigurationArea = function (id) {
        $('div#Show_' + id).remove();
    };
    Store.prototype.AccountShowHideFormAttributes = function (data) {
        $("#saveAreaMapping_" + data + "").attr("style", "display: none !important");
        $("#CancelAreaMapping_" + data + "").attr("style", "display: none !important");
        $("#EditAreaMapping_" + data + "").show();
        $("#deleteAreaMapping_" + data + "").show();
        $("#approverOrder_" + data + "").attr('disabled', 'disabled');
        $("#approverUser_" + data + "").attr('disabled', 'disabled');
        $("#ApproverUserId" + data + "").attr('disabled', 'disabled');
    };
    Store.prototype.EditAreaMapping = function (data) {
        Store.prototype.SetEditAreaMappingAttributes(data);
    };
    Store.prototype.SetEditAreaMappingAttributes = function (data) {
        $("#saveAreaMapping_" + data + "").show();
        $("#CancelAreaMapping_" + data + "").show();
        $("#EditAreaMapping_" + data + "").attr("style", "display: none !important");
        $("#deleteAreaMapping_" + data + "").attr("style", "display: none !important");
        $("#approverUser_" + data + "").attr('disabled', false);
        $("#ApproverUserId" + data + "").attr('disabled', false);
    };
    Store.prototype.DeleteAreaMapping = function (data, control) {
        if (data >= 0) {
            var test = $('.txtApproverUserId[data_userapproverid=' + data + ']:hidden').attr("data_userid", false);
            $('#PartialPage_' + data).closest('.dynamic-approverUserId').hide();
            Store.prototype.GetApproverUsersByPortalId();
            ZnodeNotification.prototype.DisplayNotificationMessagesHelper("Approver removed", 'success', isFadeOut, fadeOutTime);
        }
    };
    Store.prototype.SubmitApprovalForm = function () {
        ZnodeBase.prototype.ShowLoader();
        var data = [];
        var approvalType = $("#ddlPortalApprovalTypes option:selected").text();
        if (($(".ApprovalManagement:checked").val() == "true")) {
            var paymentIdArray = [];
            $("#ddlPortalApprovalLevel").rules("add", "required");
            $("#ddlPortalApprovalTypes").rules("add", "required");
            if ($("#ddlPortalApprovalLevel").val() == "" || $("#ddlPortalApprovalTypes").val() == "") {
                ZnodeBase.prototype.HideLoader();
                return false;
            }
            if (approvalType.toLowerCase() == "payment") {
                var checkPayment = Store.prototype.CheckPaymentName();
                if (!checkPayment) {
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorPaymentName"), 'error', isFadeOut, fadeOutTime);
                    return false;
                }
            }
            var model = Store.prototype.BindApproverDetailsToModel(data, paymentIdArray);
            if (typeof model == undefined || model == null) {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorPaymentPortalApproval"), 'error', isFadeOut, fadeOutTime);
            }
            else if ((typeof model.ApprovalUserIds != undefined && model.ApprovalUserIds != null && model.ApprovalUserIds.length > 0) || ((typeof model.PortalPaymentUserApproverList != undefined && model.PortalPaymentUserApproverList != null && model.PortalPaymentUserApproverList.length > 0)) && ($("[name=EnableApprovalManagement]:checked").val() == "true")) {
                Store.prototype.SaveUpdatePortalApprovalDetails(model);
            }
            else {
                ZnodeBase.prototype.HideLoader();
                if (($("[name=EnableApprovalManagement]:checked").val() == "false")) {
                    Store.prototype.SaveUpdatePortalApprovalDetails(model);
                }
                else if (typeof model.ApprovalUserIds == undefined || model.ApprovalUserIds == null || model.ApprovalUserIds.length < 1 && model.ApprovalUserIds && ($("[name=EnableApprovalManagement]:checked").val() == "true")) {
                    $.cookie("_backURL", "", { path: '/' });
                    ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorPortalAproval"), 'error', isFadeOut, fadeOutTime);
                }
                return false;
            }
        }
        else {
            $("#ddlPortalApprovalLevel").rules("remove", "required");
            $("#ddlPortalApprovalTypes").rules("remove", "required");
            if ($("#PortalApprovalId").val() == "0") {
                $("#ddlPortalApprovalLevel").val(1);
                $("#ddlPortalApprovalTypes").val(1);
            }
            return true;
        }
    };
    Store.prototype.SaveUpdatePortalApprovalDetails = function (model) {
        $.ajax({
            url: "/Store/SaveUpdatePortalApprovalDetails",
            data: model,
            type: 'POST',
            success: function (res) {
                Store.prototype.HideLoader();
                window.location.reload();
                window.onbeforeunload = null;
            }
        });
    };
    Store.prototype.HideShowApprovalTab = function () {
        if ($("[name=EnableApprovalManagement]:checked").val() == "true") {
            $("#ApprovalManagement").show();
        }
        else {
            $("#ApprovalManagement").hide();
        }
    };
    Store.prototype.BindProfileDeleteConfirm = function () {
        var linkctrl = $("#poptreeview").find('[data-test-selector="linkDelete"]');
        linkctrl.click(function () {
            Store.prototype.ProfileDeleteConfirmMessage();
        });
    };
    Store.prototype.ProfileDeleteConfirmMessage = function () {
        var portalProfileIds = DynamicGrid.prototype.GetMultipleSelectedIds();
        $("#PortalProfileDeletePopup").find('[data-test-selector="popDescription"]').text("Are you sure you want to delete the selected record?");
        if (portalProfileIds.length > 0 && portalProfileIds.indexOf(",") == -1) {
            var url = $("#rowcheck_" + portalProfileIds).closest('tr').find(".grid-action").find('.z-manage').attr('href');
            if (url != undefined && url.indexOf('parentProfileId') >= 0) {
                var cutStr = url.substr(url.indexOf('parentProfileId'), url.length);
                var arr = cutStr.split('=');
                if (arr.length > 1 && arr[1] != undefined && parseInt(arr[1]) > 0) {
                    $("#PortalProfileDeletePopup").find('[data-test-selector="popDescription"]').text("Deleting the profile may hamper the user associated with this profile, Are you sure you want to delete the selected record?");
                }
            }
        }
    };
    Store.prototype.ManageStoreProfiles = function () {
        if ($("#ZnodePortalProfile").length > 0) {
            $("#grid > tbody > tr").each(function () {
                var ctlr = $(this).find(".grid-action").find('.z-manage');
                var delbtn = $(this).find(".grid-action").find('.z-delete');
                var url = ctlr.attr('href');
                if (url.indexOf('parentProfileId') >= 0) {
                    var cutStr = url.substr(url.indexOf('parentProfileId'), url.length);
                    var arr = cutStr.split('=');
                    if (arr.length > 1 && arr[1] != undefined && parseInt(arr[1]) > 0) {
                        ctlr.show();
                        delbtn.click(function () {
                            $("#PopUpConfirm").find('[data-test-selector="popDescription"]').text("Deleting the profile may hamper the user associated with this profile, Are you sure you want to delete the selected record?");
                        });
                    }
                    else {
                        ctlr.hide();
                        delbtn.click(function () {
                            $("#PopUpConfirm").find('[data-test-selector="popDescription"]').text("Are you sure you want to delete the selected record?");
                        });
                    }
                }
            });
        }
    };
    Store.prototype.BindApproverDetailsToModel = function (data, paymentIdArray) {
        var approvalType = $("#ddlPortalApprovalTypes option:selected").text();
        var portalPaymentApprovalList = new Array();
        var portalPaymentGroupId = 0;
        if (approvalType.toLowerCase() == "payment") {
            var duplicateValues = Store.prototype.FindDuplicateInArray($(".multiselect-container .active input").not("[value='multiselect-all']").map(function () { return $(this).val(); }).toArray());
            if (typeof duplicateValues != undefined && duplicateValues != null && duplicateValues.length < 1) {
                $(".payment-portal").each(function (index) {
                    data = [];
                    paymentIdArray = [];
                    var count = index + 1;
                    if (typeof count == undefined || count == null) {
                        count = 0;
                    }
                    $(this).find('#paymentList_' + count + ' .multiselect-container .active input').each(function (index, value) {
                        if (value['value'] != "multiselect-all") {
                            paymentIdArray.push(value['value']);
                        }
                    });
                    $(this).find('#_PartialPortalApproverPanel_' + count + ' .dynamic-approvers input[type=hidden]').each(function () {
                        if ($(".dynamic-approvers").find("input[type=hidden]").length > 0) {
                            var userApproverId = $(this).attr("data_userapproverId");
                            var isActive;
                            var isActiveFlag = $(this).attr("data_userid");
                            if (isActiveFlag == "True") {
                                isActive = 1;
                            }
                            else {
                                isActive = 0;
                            }
                            var ApproverUserid = $(this).attr("value");
                            if (ApproverUserid != '0' && isActive == 1)
                                data.push(ApproverUserid + '_' + userApproverId + '_' + isActive);
                        }
                    });
                    portalPaymentGroupId = $(".payment-portal").find("#PortalPaymentGroupId_" + count).val();
                    if (typeof portalPaymentGroupId == undefined || portalPaymentGroupId == null || portalPaymentGroupId == 0) {
                        portalPaymentGroupId = null;
                    }
                    var portalPaymentApproval = {
                        ApprovalUserIds: data,
                        PaymentSettingIds: paymentIdArray,
                        PortalPaymentGroupId: portalPaymentGroupId
                    };
                    if (portalPaymentApproval.PaymentSettingIds.length != 0 && portalPaymentApproval.ApprovalUserIds.length != 0) {
                        portalPaymentApprovalList.push(portalPaymentApproval);
                    }
                });
                var _approverDetailsViewModel = {
                    EnableApprovalManagement: $("[name=EnableApprovalManagement]:checked").val(),
                    OrderLimit: $("#valOrderLimit").val(),
                    PortalApprovalTypeId: $("#ddlPortalApprovalTypes option:selected").val(),
                    PortalApprovalLevelId: $("#ddlPortalApprovalLevel option:selected").val(),
                    PortalId: $("#portalId").val(),
                    ApprovalUserIds: null,
                    PortalPaymentGroupId: portalPaymentGroupId,
                    PortalApprovalId: $("#PortalApprovalId").val(),
                    PaymentTypeIds: null,
                    PortalPaymentUserApproverList: portalPaymentApprovalList
                };
                return _approverDetailsViewModel;
            }
            else {
                ZnodeNotification.prototype.DisplayNotificationMessagesHelper(ZnodeBase.prototype.getResourceByKeyName("ErrorPaymentPortalApproval"), 'error', isFadeOut, fadeOutTime);
                return null;
            }
        }
        else {
            $(".dynamic-approvers").find("input[type=hidden]").each(function () {
                if ($(".dynamic-approvers").find("input[type=hidden]").length > 0) {
                    var userApproverId = $(this).attr("data_userapproverId");
                    var isActive;
                    var isActiveFlag = $(this).attr("data_userid");
                    if (isActiveFlag == "True") {
                        isActive = 1;
                    }
                    else {
                        isActive = 0;
                    }
                    var ApproverUserid = $(this).attr("value");
                    if (ApproverUserid != "0" && isActive == 1)
                        data.push(ApproverUserid + '_' + userApproverId + '_' + isActive);
                }
            });
            var _approverDetailsViewModel = {
                EnableApprovalManagement: $("[name=EnableApprovalManagement]:checked").val(),
                OrderLimit: $("#valOrderLimit").val(),
                PortalApprovalTypeId: $("#ddlPortalApprovalTypes option:selected").val(),
                PortalApprovalLevelId: $("#ddlPortalApprovalLevel option:selected").val(),
                PortalId: $("#portalId").val(),
                ApprovalUserIds: data,
                PortalPaymentGroupId: null,
                PortalApprovalId: $("#PortalApprovalId").val(),
                PaymentTypeIds: paymentIdArray,
                PortalPaymentUserApproverList: new Array()
            };
            return _approverDetailsViewModel;
        }
    };
    Store.prototype.FindDuplicateInArray = function (arra1) {
        var object = {};
        var result = [];
        arra1.forEach(function (item) {
            if (!object[item])
                object[item] = 0;
            object[item] += 1;
        });
        for (var prop in object) {
            if (object[prop] >= 2) {
                result.push(prop);
            }
        }
        return result;
    };
    //To clear checkbox alredy checked when popup opens for publish
    Store.prototype.ClearEnableCheckboxChecked = function () {
        $('input[type^="checkbox"]').each(function () {
            if (!$(this).prop('disabled') && $(this).is(':checked')) {
                $(this).prop('checked', false);
            }
            if ($(this).val().toLowerCase() == 'draft') {
                $(this).prop('disabled', true);
            }
        });
    };
    //To Check Payment Name value when Approval Type is Payment
    Store.prototype.CheckPaymentName = function () {
        var data = [];
        var paymentIdArray = [];
        var ispaymentName = true;
        $(".payment-portal").each(function (index) {
            data = [];
            paymentIdArray = [];
            var count = index + 1;
            if (typeof count == undefined || count == null) {
                count = 0;
            }
            $(this).find('#paymentList_' + count + ' .multiselect-container .active input').each(function (index, value) {
                if (value['value'] != "multiselect-all") {
                    paymentIdArray.push(value['value']);
                }
            });
            var PaymentSettingIds = paymentIdArray;
            if (PaymentSettingIds.length == 0) {
                ispaymentName = false;
                return false;
            }
        });
        return ispaymentName;
    };
    return Store;
}(ZnodeBase));
$(document).on("keypress", "#valOrderLimit", function (e) {
    if (e.which == 46) {
        if ($(this).val().indexOf('.') != -1) {
            return false;
        }
    }
    if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});
$(document).on("cut copy paste", "#valOrderLimit", function (e) {
    e.preventDefault();
});
//# sourceMappingURL=Store.js.map