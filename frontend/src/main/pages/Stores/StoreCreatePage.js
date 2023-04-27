import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import StoreForm from "main/components/Stores/StoreForm";
import { useNavigate } from 'react-router-dom'
import { storeUtils } from 'main/utils/storeUtils';

export default function StoreCreatePage() {

  let navigate = useNavigate(); 

  const onSubmit = async (store) => {
    const createdStore = storeUtils.add(store);
    console.log("createdStore: " + JSON.stringify(createdStore));
    navigate("/stores");
  }  

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Store</h1>
        <StoreForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  )
}
