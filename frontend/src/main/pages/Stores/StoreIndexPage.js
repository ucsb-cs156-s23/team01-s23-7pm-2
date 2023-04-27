import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import StoreTable from 'main/components/Stores/StoreTable';
import { storeUtils } from 'main/utils/storeUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function StoreIndexPage() {

    const navigate = useNavigate();

    const storeCollection = storeUtils.get();
    const stores = storeCollection.stores;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`StoreIndexPage deleteCallback: ${showCell(cell)})`);
        storeUtils.del(cell.row.values.id);
        navigate("/stores");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/stores/create">
                    Create Store
                </Button>
                <h1>Stores</h1>
                <StoreTable stores={stores} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}