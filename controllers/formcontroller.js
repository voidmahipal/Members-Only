function getSignUpForm(req,res,next) {
    res.render("signupform");
}
function getLogInForm(req,res,next) {
    res.render("loginform");
}
function getMembersForm(req,res,next) {
    res.render("memberform");
}
function getAdminForm(req,res,next) {
    res.render("adminform");
}
function getMessageForm(req,res,next) {
    const {userId} = req.params;
    res.render("messageform",{userId:userId});
}
export {getSignUpForm,getLogInForm,getMembersForm,getAdminForm,getMessageForm};