/**
 * Created by Nitish on 3/17/2016.
 */
module.exports  = function(app, formModel){
    
    app.get("/api/assignment/user/:userId/form", findFormsByUser);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function findFormsByUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        console.log("Form Service - Server: ");
        console.log(forms);
        res.json(forms);
    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        console.log("Form Service - Server: " + form);
        res.json(form);
    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        console.log(formId);
        console.log("delete server service");
        console.log(formId);
        var forms = formModel.deleteFormById(formId);
        //console.log("Form Service - Server: " + forms);
        res.send(forms);
    }

    function createFormForUser(req, res) {
        console.log("Create Form");
        var title = req.body;
        var userId = req.params.userId;
        console.log(userId);
        console.log(title);
        var forms = formModel.createFormForUser(userId, title.title);
        console.log("Form Service  - Server: ");
        console.log(forms);
        res.send(forms);
    }

    function updateFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        forms = formModel.updateFormById(formId, form.title);
        console.log("Form Service - Server: " + forms);
        res.send(forms);
    }

};