/**
 * Created by Nitish on 3/17/2016.
 */
module.exports  = function(app, formModel){
    app.get("/api/assignment/user/:userId/form", findFormsByUser);
    app.get("/api/assignment//form/:formId", findFormByFormId);
    app.delete("/api/assignment//form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function findFormsByUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        console.log("Form Service - Server: " + forms);
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
        var forms = formModel.deleteFormById(formId);
        console.log("Form Service - Server: " + forms);
        res.send(200);
    }

    function createForm(req, res) {
        var form = req.body;
        var userId = req.params.userId;
        form = formModel.createFormForUser(userId, form)
        console.log("Form Service - Server: " + form);
    }

    function updateFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateFormById(formId, form);
        console.log("Form Service - Server: " + form);
        res.send(200);
    }

}