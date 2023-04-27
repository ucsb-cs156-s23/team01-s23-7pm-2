import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";
import StoreTable from 'main/components/Stores/StoreTable';
import { storeUtils } from 'main/utils/storeUtils';

export default function StoreDetailsPage() {
  let { id } = useParams();

  const response = storeUtils.getById(id);

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Store Details</h1>
        <StoreTable stores={[response.store]} showButtons={false} />
      </div>
    </BasicLayout>
  )
}
