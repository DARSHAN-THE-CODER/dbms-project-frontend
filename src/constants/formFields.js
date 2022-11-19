// faculty signup fields
const signupFields = [
    {
        labelText:"First Name",
        labelFor:"firstName",
        id:"firstName",
        name:"firstName",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"First Name"   
    },
    {
        labelText:"Last Name",
        labelFor:"lastName",
        id:"lastName",
        name:"lastName",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Last Name"   
    },
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"password",
        isRequired:true,
        placeholder:"password"   
    },
    {
        labelText:"Institution Name",
        labelFor:"institutionName",
        id:"institution",
        name:"institution",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Instiution Name"   
    },
    {
        labelText:"Contact Number",
        labelFor:"contact",
        id:"contact",
        name:"contact",
        type:"number",
        autoComplete:"number",
        isRequired:true,
        placeholder:"Mobile number"   
    },
    {
        labelText:"DOB",
        labelFor:"DOB",
        id:"DOB",
        name:"DOB",
        type:"datetime-local",
        autoComplete:"",
        isRequired:true,
        placeholder:"DOB"   
    },
]

// faculty login fields

const loginFields = [
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email"   
    },
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"password",
        isRequired:true,
        placeholder:"password"   
    },
]

const createClass = [
    {
        labelText:"COURSE NAME",
        labelFor:"course",
        id:"course",
        name:"course",
        type:"test",
        autoComplete:"",
        isRequired:true,
        placeholder:"Course Name"   
    },
    {
        labelText:"Subject",
        labelFor:"subject",
        id:"subject",
        name:"subject",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Subject"   
    },
    {
        labelText:"CLASS NAME",
        labelFor:"className",
        id:"className",
        name:"className",
        type:"className",
        autoComplete:"",
        isRequired:true,
        placeholder:"Class Name"   
    }
]

const createStudent = [
    {
        labelText:"SRN",
        labelFor:"srn",
        id:"srn",
        name:"srn",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"SRN"   
    },
    {
        labelText:"Name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"name",
        autoComplete:"",
        isRequired:true,
        placeholder:"Name"   
    }
]

const createAssignment = [
    {
        labelText:"Assignment Number",
        labelFor:"assignmentNumber",
        id:"assignmentNumber",
        name:"assignmentNumber",
        type:"number",
        autoComplete:"",
        isRequired:true,
        placeholder:"Assignment Number"   
    },
    {
        labelText:"Title",
        labelFor:"title",
        id:"title",
        name:"title",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Title"   
    },
    {
        labelText:"Description",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Description"   
    },
    {
        labelText:"Resource Link",
        labelFor:"resourceLink",
        id:"resources",
        name:"resources",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Resource Link"   
    },
    {
        labelText:"Due Date",
        labelFor:"deadline",
        id:"deadline",
        name:"deadline",
        type:"datetime-local",
        autoComplete:"",
        isRequired:true,
        placeholder:"Due Date"   
    },
]

const editAssignment = [
    {
        labelText:"Assignment Number",
        labelFor:"assignmentNumber",
        id:"assignmentNumber",
        name:"assignmentNumber",
        type:"number",
        autoComplete:"",
        isRequired:true,
        placeholder:"Assignment Number"   
    },
    {
        labelText:"Title",
        labelFor:"title",
        id:"title",
        name:"title",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Title"   
    },
    {
        labelText:"Description",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Description"   
    },
    {
        labelText:"Resource Link",
        labelFor:"resourceLink",
        id:"resources",
        name:"resources",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Resource Link"   
    },
    {
        labelText:"Due Date",
        labelFor:"deadline",
        id:"deadline",
        name:"deadline",
        type:"datetime-local",
        autoComplete:"",
        isRequired:true,
        placeholder:"Due Date"   
    },
]

const limitedStudentsForm = [
    {
        labelText:"Get These number of students",
        labelFor:"limit",
        id:"limit",
        name:"limit",
        type:"number",
        autoComplete:"",
        isRequired:true,
        placeholder:"Limit"   
    },
    {
        labelText:"Skip These number of students",
        labelFor:"offset",
        id:"offset",
        name:"offset",
        type:"number",
        autoComplete:"",
        isRequired:true,
        placeholder:"Offset"   
    },
]

const editSubmission = [
    {
        labelText:"SRN",
        labelFor:"srn",
        id:"srn",
        name:"srn",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"SRN"   
    },
    {
        labelText:"Response",
        labelFor:"response",
        id:"response",
        name:"response",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"Response"   
    },
    {
        labelText:"Marks",
        labelFor:"marks",
        id:"marks",
        name:"marks",
        type:"number",
        autoComplete:"",
        isRequired:true,
        placeholder:"Marks"   
    },
]

const studentForm1 = [
    {
        labelText:"SRN",
        labelFor:"srn",
        id:"srn",
        name:"srn",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"SRN"   
    },
    {
        labelText:"CLASS CODE",
        labelFor:"classCode",
        id:"classCode",
        name:"classCode",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"CLASS CODE"   
    },
]

const submissionResponse = [
    {
        labelText:"Response",
        labelFor:"response",
        id:"response",
        name:"response",
        type:"text",
        autoComplete:"",
        isRequired:true,
        placeholder:"response"   
    },
]

// this form is used to show students while submitting their assignment 
const disabledAssignmentFields = [
    {
        labelText:"Assignment Number",
        labelFor:"assignmentNumber",
        id:"assignmentNumber",
        name:"assignmentNumber",
        type:"number",
        autoComplete:"",
        disabled:true,
        isRequired:true,
        placeholder:"Assignment Number"   
    },
    {
        labelText:"Title",
        labelFor:"title",
        id:"title",
        name:"title",
        type:"text",
        autoComplete:"",
        isRequired:true,
        disabled:true,
        placeholder:"Title"   
    },
    {
        labelText:"Description",
        labelFor:"description",
        id:"description",
        name:"description",
        type:"text",
        autoComplete:"",
        isRequired:true,
        disabled:true,
        placeholder:"Description"   
    },
    {
        labelText:"Resource Link",
        labelFor:"resourceLink",
        id:"resources",
        name:"resources",
        type:"text",
        autoComplete:"",
        isRequired:true,
        disabled:true,
        placeholder:"Resource Link"   
    },
    {
        labelText:"Due Date",
        labelFor:"deadline",
        id:"deadline",
        name:"deadline",
        type:"datetime-local",
        autoComplete:"",
        isRequired:true,
        disabled:true,
        placeholder:"Due Date"   
    },
]

export {loginFields,signupFields, createClass, createStudent, createAssignment, limitedStudentsForm, editSubmission, studentForm1, submissionResponse, disabledAssignmentFields}

// {
    // labelText:"",
    // labelFor:"",
    // id:"",
    // name:"",
    // type:"",
    // autoComplete:"",
    // isRequired:true,
    // placeholder:""   
// }

// https://blog.logrocket.com/storing-retrieving-javascript-objects-localstorage/