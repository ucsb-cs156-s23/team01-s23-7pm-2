
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import { storeUtils }  from 'main/utils/storeUtils';
import StoreForm from 'main/components/Stores/StoreForm';
import { useNavigate } from 'react-router-dom'


export default function StoreEditPage() {
    let { id } = useParams();

    let navigate = useNavigate(); 

    const response = storeUtils.getById(id);

    const onSubmit = async (store) => {
        const updatedStore = storeUtils.update(store);
        console.log("updatedStore: " + JSON.stringify(updatedStore));
        navigate("/stores");
    }  

    return (
        <BasicLayout>
            <div className="pt-2">
                <h1>Edit Store</h1>
                <StoreForm submitAction={onSubmit} buttonLabel={"Update"} initialContents={response.store}/>
            </div>
        </BasicLayout>
    )
}