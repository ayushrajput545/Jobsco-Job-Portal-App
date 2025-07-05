 
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function CommonForm({action,buttonText,isBtnDisabled,formControls,btnType,formData , setFormData ,handleFileChange}){

    function renderInputByComponentType(getCurrentControl){
        let content = null;

        //componenet type-> input , select , radio , textArea , checkBox
        switch(getCurrentControl.componentType){
            case 'input':
                content=<div className="relative flex items-center mt-8">
                    <Input
                     type='text'
                     disabled={getCurrentControl.disabled}
                     placeholder={getCurrentControl.placeholder}
                     name={getCurrentControl.name}
                     id={getCurrentControl.id}
                     value={formData[getCurrentControl.name]}
                     onChange={(e)=>setFormData((prev)=>({
                        ...prev,
                        [e.target.name]:e.target.value
                     }))}
                     className='w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>
            break;
            
            case 'file':
                content=<Label href={getCurrentControl.name} className='flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer'>
                    <h2>{getCurrentControl.label}</h2>
                    <Input onChange={handleFileChange} id={getCurrentControl.name} type='file'/>
                </Label>
            break;

            default: content=<div className="relative flex items-center mt-8">
                    <Input
                     type='text'
                     disabled={getCurrentControl.disabled}
                     placeholder={getCurrentControl.placeholder}
                     name={getCurrentControl.name}
                     id={getCurrentControl.id}
                     value={formData[getCurrentControl.name]}
                     onChange={(e)=>setFormData((prev)=>({
                        ...prev,
                        [e.target.name]:e.target.value
                     }))}
                     className='w-full rounded-md h-[60px] px-4 border bg-gray-100 text-lg outline-none drop-shadow-sm transition-all duration-300 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:ring-0 focus-visible:ring-offset-0'
                    />
                </div>
            break;   
        }

        return content;

    }
    return(
        <form action={action}>
            {
                formControls.map((control , i)=>(
                    <div key={i}>
                        {renderInputByComponentType(control)}
                    </div>
                ))
            }
            <div>
                <Button
                 type={btnType || "submit"}
                 className='disabled:opacity-60 flex h-11 items-center justify-center mt-5'
                 disabled={isBtnDisabled}
                >
                    {buttonText}
                </Button>
            </div>

        </form>
    )
}