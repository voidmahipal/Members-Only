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

export {getSignUpForm,getLogInForm,getMembersForm,getAdminForm};