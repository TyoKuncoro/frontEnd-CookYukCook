import { parseJwt } from "#/app/Component/Helper/convert";
import FormUbahPengajuan from "#/app/Component/formUbahPengajuan"
import { regularClassRepository } from "#/repository/regularClass";
import { useEffect } from "react";

const coba = () => {
    let id:any;
    const token = localStorage.getItem("access_token");
    if(token){
        id = parseJwt(token).id
    }
    const { data, mutate: mutateData } = regularClassRepository.hooks.findRegClassByKitchen(id);
    // console.log(data?.data?.material, 'hallooo')
    // useEffect(() => {
    //   setRegular(data?.data);
    // }, [data]);
    return (
        <div>
            {data && data.data && (
                <div>
                    {data.data.map((items:any) =>{
                        return(
                            <div key={items.id}>
                                <div className=" space-y-0">
                                       <p className="text-4xl font-bold">{items.courseName}</p>
                                       <p className="text-2xl">Tema: {items.theme.name}</p>
                                       <p className="text-xl">Chef: {items.theme.chef_name}</p>
                                     </div>
                                     
                            </div>

                        )
                    })}
                </div>
            )}
        </div>
    )
}
export default coba