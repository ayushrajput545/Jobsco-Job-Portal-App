import queryString from "query-string"

export const recruiterOnBoardFormControls=[

    {
        label:'Name',
        name:'name',
        placeholder:'Enter your name...',
        componentType:'input'
    },

    {
        label:'Company name',
        name:'companyName',
        placeholder:'Enter your company name...',
        componentType:'input'
    },
    {
        label:'Company Role',
        name:'companyRole',
        placeholder:'Enter your role (ex: HR Specialist , Software engineer)...',
        componentType:'input'
    },
]

export const candidateOnBoardFormControls=[
    {
        label:'Resume',
        name:'resume',
        componentType:'file'
    },
    {
        label:'Name',
        name:'name',
        placeholder:'Enter your name',
        componentType:'input'
    },

    {
        label:'Current Company',
        name:'currentCompany',
        placeholder:'Enter your current company (if not type NA)',
        componentType:'input'
    },

    {
        label:'Current Job Location',
        name:'currentJobLocation',
        placeholder:'Enter your current job location (if not type NA)',
        componentType:'input'
    },

    {
        label:'Current Salary',
        name:'currentSalary',
        placeholder:'Enter your current salary (if not type NA)',
        componentType:'input'
    },

    {
        label:'Notice Period',
        name:'noticePeriod',
        placeholder:'Enter your notice period (if not type NA)',
        componentType:'input'
    },
    {
        label:'Skills',
        name:'skills',
        placeholder:'Enter your Skills (React.js , MongoDB, Node.js)',
        componentType:'input'
    },
    {
        label:'Total Experience',
        name:'totalExperience',
        placeholder:'Enter your total experience (ex: 2 months , 1 yr)',
        componentType:'input'
    },

    {
        label:'CollegeInfo',
        name:'collegeInfo',
        placeholder:'Enter your college name , degree and graduation year',
        componentType:'input'
    },

    {
        label:'linkedin',
        name:'linkedin',
        placeholder:'Enter your linkedin profile link',
        componentType:'input'
    },
]

export const postNewJobFormControls=[
    {
        label:"Company Name",
        name:'companyName',
        placeholder:'Company name',
        componentType:"input"
    },

    {
        label:"Title",
        name:'jobTitle',
        placeholder:'Enter job title (ex: web Developer, SDE etc)',
        componentType:"input"
    },

    {
        label:"Type",
        name:'jobType',
        placeholder:'Enter job type (Part time , Internship)',
        componentType:"input"
    },
    {
        label:"Location",
        name:'jobLocation',
        placeholder:'Enter Job Location...',
        componentType:"input"
    },

    {
        label:"Experience",
        name:'jobExperience',
        placeholder:'Enter job experience (ex: 2 months , 1 yr)',
        componentType:"input"
    },

    {
        label:"Description",
        name:'jobDescription',
        placeholder:'Enter job description',
        componentType:"input"
    },

    {
        label:"Skills",
        name:'skills',
        placeholder:'Enter skills required (React.js , MongoDB, Node.js)',
        componentType:"input"
    }

]

export const filterMenuData=[
    {
        id:'companyName',
        label:'Company Name'
    },

    {
        id:'jobTitle',
        label:'Title'
    },

    {
        id:'jobType',
        label:'Type'
    },

    {
        id:'jobLocation',
        label:'Location'
    }

]

export function formUrlQuery({params,dataToAdd}){
    let currentUrl = queryString.parse(params)

    if(Object.keys(dataToAdd).length >0){
        Object.keys(dataToAdd).map(key=>{
            if(dataToAdd[key].length===0) delete currentUrl[key];
            else currentUrl[key]=dataToAdd[key].join(",");
        });
    }
    return queryString.stringifyUrl(
        {
            url:window.location.pathname,
            query: currentUrl
        },
        {
            skipNull:true
        }
    )
}

export const MemberShipPlans = [
    {
        heading:'Tier 1',
        price:100,
        type:'basic'
    },

    {
        heading:'Tier 2',
        price:1000,
        type:'teams'
    },
    {
        heading:'Tier 3',
        price:5000,
        type:'enterprise'
    }
]