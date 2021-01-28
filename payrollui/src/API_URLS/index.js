export const PATH_BASE = 'http://localhost:2345/v1/test/users';
export const PATH_DELETEUSER = 'http://localhost:2345/v1/test/deleteusers';
export const PARAM_DELETE = 'values=';

export const PATH_DISABLEUSER = 'http://localhost:2345/v1/test/disableusers';
export const PARAM_DISABLE = 'useridvalues=';

export const PATH_ADDUSER  = 'http://localhost:2345/v1/test/user';
export const PARAM_PAGE = 'page=';
//export const PATH_ADDUSER  = 'http://localhost:2345/v1/test/user/{name}';
export const PATH_FINDUSERBY_EMAIL = 'http://localhost:2345/v1/test/useremail';
export const PATH_GET_DEPARTMENT = 'http://localhost:2345/v1/test/departments';
export const PATH_ADD_DEPARTMENT = 'http://localhost:2345/v1/test/departments';
export const PATH_DELETE_DEPARTMENT = 'http://localhost:2345/v1/test/deletedepartment';
export const PATH_PATCH_EDITDEPARTMENT = 'http://localhost:2345/v1/test/departments';

export const PATH_GET_ROLES = 'http://localhost:2345/v1/test/role';
export const PATH_DELETE_ROLE = 'http://localhost:2345/v1/test/deleterole';
export const PATH_ADD_ROLE = 'http://localhost:2345/v1/test/role';
export const PATH_PATCH_EDIT_ROLE = 'http://localhost:2345/v1/test/role';

export const PATH_VIEW_USERDEPARTMENTS = 'http://localhost:2345/v1/test/userdepartment';

export const PATH_SENDLOGINDETAILS = 'http://localhost:2345/v1/test/sendemail';
export const PATH_LOGINMESSAGE = 'Login with your email and your password is';

export const PATH_SENDLOGINDETAILS_GMAIL ='http://localhost:2345/v1/test/sendLoginCredentials';
export const PATH_ASSIGNUSERROLES = 'http://localhost:2345/v1/test/assignUserRole';
export const PATH_ASSIGNUSER_DEPARTMENT = 'http://localhost:2345/v1/test/assignUserDepartment'

export const PATH_GET_ALLUSERROLESBUT_SHOWADMINS = 'http://localhost:2345/v1/test/userroles';

export const PATH_PATCH_EDITUSER = 'http://localhost:2345/v1/test/user';

export const PATH_GETALL_DESIGNATION = 'http://localhost:2345/v1/test/designation';
export const PATH_ADD_DESIGNATION = 'http://localhost:2345/v1/test/designation';
export const PATH_DELETE_DESIGNATION = 'http://localhost:2345/v1/test/deletedesignation'

export const PATH_GET_USERDESIGNATIONS = 'http://localhost:2345/v1/test/userdesignation';
export const PATH_DELETE_USERDESIGNATION = 'http://localhost:2345/v1/test/deleteuserdesignation'
export const PATH_ASSIGNUSERDESIGNATION = 'http://localhost:2345/v1/test/userdesignation'
export const PATH_PATCH_DESIGNATION = 'http://localhost:2345/v1/test/designation';

//need to implement restendpoints starting from here
export const PATH_GETALL_BENEFITS = 'http://localhost:2345/v1/test/benefit';
export const PATH_POST_BENEFIT = 'http://localhost:2345/v1/test/benefit';
export const NO_OF_DESIGNATIONS = 'designations='

export const PATH_PATCH_BENEFIT = 'http://localhost:2345/v1/test/benefit';
export const PATH_DELETE_BENEFIT = 'http://localhost:2345/v1/test/deletebenefit'

export const PATH_GET_ALL_USERBENEFITS = 'http://localhost:2345/v1/test/userbenefit';
export const PATH_DELETE_USERBENEFIT = 'http://localhost:2345/v1/test/deleteuserbenefit';
export const PATH_POST_USERBENEFIT = 'http://localhost:2345/v1/test/userbenefit';
export const PATH_PATCH_USERBENEFIT = 'http://localhost:2345/v1/test/userbenefit';

//http://localhost:2345/v1/test/userbenefit/{benefitid}/{userid}
//http://localhost:2345/v1/test/deletebenefit{id}
//http://localhost:2345/v1/test/deleteuserbenefit/{id}
//----------need to implemented commented line above


//http://localhost:2345/v1/test/deletedesignation/{id}
//http://localhost:2345/v1/test/designation/{desname}/{deptid}
//http://localhost:2345/v1/test/deleteuserdesignation/{id}
//'http://localhost:2345/v1/test/userdesignation/{userid}/{degsnid}'