/**
 * Created by Nitish on 3/17/2016.
 */
module.exports = function(app, userModel, formModel){
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId" , deleteFieldById);
    app.post("/api/assignment/form/:formId/field" , createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function findFieldsByFormId(req, res){

    }

    function findFieldById(req, res) {

    }

    function deleteFieldById(req, res) {

    }

    function createField(req, res) {

    }

    function updateFieldById(req, res) {

    }

}