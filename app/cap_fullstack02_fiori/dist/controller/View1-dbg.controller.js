sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/Label",
    "sap/ui/core/Core",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Dialog, Input, Button, Text, Label, Core,MessageBox) {
        "use strict";
        var path;
        var that;

        return Controller.extend("capfullstack02fiori.capfullstack02fiori.controller.View1", {
            onInit: function () {
                that = this;
                path = this.getOwnerComponent().getManifestObject()._oBaseUri._parts.path;


            }
            ,
            read: function () {
                let sUrl = path + "main/Materials";

                var oTextModel = this.getOwnerComponent().getModel("textModel");
                var oTable = this.getView().byId("idTabel01");
                this.getView().setBusyIndicatorDelay(0);
                this.getView().setBusy(true);


                jQuery.ajax({
                    url: sUrl,
                    method: "GET",
                    success: function (oResponse) {

                        debugger;
                        oTextModel.setData(oResponse.value);
                        oTable.setModel(oTextModel);
                        oTable.bindRows("textModel>/");
                        that.getView().setBusy(false);

                        MessageBox.success("Read Operation Performed!!");

                    },
                    error: function (oError) {
                        debugger;
                        that.getView().setBusy(false);
                        MessageBox.error("Error Occured");

                    }
                });

            },
            create: function () {
                if (!this.oDraggableDialog) {
                    this.oDraggableDialog = new Dialog({
                        title: "Create Material",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        draggable: true,
                        content: [new Label({ text: "Material Number" }), new Input("idMNumber"), new Label({ text: "Material Name" }), new Input("idMName"), new Label({ text: "Units in Stock" }), new Input("idMUnitinStock"), new Label({ text: "Is Available" }), new Input("idAvail")],
                        endButton: new Button({
                            text: "Create",
                            press: function () {
                                debugger;
                                var sUrl = path + "main/Materials";
                                var payload = {};
                                payload.MaterialNumber = parseInt(Core.byId("idMNumber").getValue());
                                payload.MaterialName = Core.byId("idMName").getValue();
                                payload.UnitsInStock = parseInt(Core.byId("idMUnitinStock").getValue());
                                payload.IsAvailable = JSON.parse(Core.byId("idAvail").getValue());

                                jQuery.ajax({
                                    url: sUrl,
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify(payload),
                                    success: function (oResponse) {
                                        debugger;
                                        MessageBox.success("Record Created!!");
                                    },
                                    error: function (oError) {
                                        debugger;
                                        MessageBox.error("Error Occured");

                                    }
                                });

                                this.oDraggableDialog.close();

                            }.bind(this)
                        })
                    });

                    //to get access to the controller's model
                    this.getView().addDependent(this.oDraggableDialog);
                }
                else{

                    Core.byId("idMNumber").setValue();
                    Core.byId("idMName").setValue();
                    Core.byId("idMUnitinStock").setValue();
                    Core.byId("idAvail").setValue();
                }

                this.oDraggableDialog.open();
            },
            delete: function (oEvent) {
                debugger;
                var oTable = this.getView().byId("idTabel01");
                let index = oTable.getSelectedIndex();
                let selPath = '/' + index;
                var selectedObject = oTable.getModel().getProperty(selPath);
                var sUrl = path + "main/Materials/" + selectedObject.MaterialNumber;

                jQuery.ajax({
                    url: sUrl,
                    method: "DELETE",
                    success: function (oResponse) {
                        debugger;
                        MessageBox.success("Record Deleted!!");
                    },
                    error: function (oError) {
                        debugger;
                        MessageBox.error("Error Occured");

                    }
                });

            },
            update: function (oEvent) {
                debugger;
                var oTable = this.getView().byId("idTabel01");
                let index = oTable.getSelectedIndex();
                let selPath = '/' + index;
                var selectedObject = oTable.getModel().getProperty(selPath);
                var sUrl = path + "main/Materials/" + selectedObject.MaterialNumber;
                var payload = {};
                payload.MaterialNumber = selectedObject.MaterialNumber;
                payload.MaterialName = selectedObject.MaterialName;
                payload.UnitsInStock = selectedObject.UnitsInStock;
                payload.IsAvailable = selectedObject.IsAvailable;


                if (!this.oDraggableDialog1) {
                    this.oDraggableDialog1 = new Dialog({
                        title: "Update Material",
                        contentWidth: "550px",
                        contentHeight: "300px",
                        draggable: true,
                        content: [new Label({ text: "Material Number" }), new Input("idMNumber1", { value: payload.MaterialNumber, editable: false }), new Label({ text: "Material Name" }), new Input("idMName1", { value: payload.MaterialName }), new Label({ text: "Units in Stock" }), new Input("idMUnitinStock1", { value: payload.UnitsInStock }), new Label({ text: "Is Available" }), 
                        new Input("idAvail1", { value: payload.IsAvailable })],
                        endButton: new Button({
                            text: "Update",
                            press: function () {
                                debugger;
                                payload.MaterialNumber = selectedObject.MaterialNumber;
                                payload.MaterialName = Core.byId("idMName1").getValue();
                                payload.UnitsInStock = parseInt(Core.byId("idMUnitinStock1").getValue());
                                payload.IsAvailable = JSON.parse(Core.byId("idAvail1").getValue());

                                jQuery.ajax({
                                    url: sUrl,
                                    method: "PATCH",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: JSON.stringify(payload),
                                    success: function (oResponse) {
                                        debugger;
                                        MessageBox.success("Record Updated!!");
                                    },
                                    error: function (oError) {
                                        debugger;
                                        MessageBox.error("Error Occured");

                                    }
                                });

                                this.oDraggableDialog1.close();

                            }.bind(this)
                        })
                    });

                    //to get access to the controller's model
                    this.getView().addDependent(this.oDraggableDialog1);
                }else{
                    Core.byId("idMNumber1").setValue(payload.MaterialNumber);
                    Core.byId("idMName1").setValue(payload.MaterialName);
                    Core.byId("idMUnitinStock1").setValue(payload.UnitsInStock);
                    Core.byId("idAvail1").setValue(payload.IsAvailable);

                }

                this.oDraggableDialog1.open();

            }
        });
    });
