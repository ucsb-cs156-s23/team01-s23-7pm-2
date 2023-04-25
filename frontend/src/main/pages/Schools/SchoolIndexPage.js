import React from 'react'
import Button from 'react-bootstrap/Button';
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import SchoolTable from 'main/components/Schools/SchoolTable';
import { SchoolUtils } from 'main/utils/SchoolUtils';
import { useNavigate, Link } from 'react-router-dom';

export default function SchoolIndexPage() {

    const navigate = useNavigate();

    const SchoolCollection = SchoolUtils.get();
    const Schools = SchoolCollection.Schools;

    const showCell = (cell) => JSON.stringify(cell.row.values);

    const deleteCallback = async (cell) => {
        console.log(`SchoolIndexPage deleteCallback: ${showCell(cell)})`);
        SchoolUtils.del(cell.row.values.id);
        navigate("/Schools");
    }

    return (
        <BasicLayout>
            <div className="pt-2">
                <Button style={{ float: "right" }} as={Link} to="/Schools/create">
                    Create School
                </Button>
                <h1>Schools</h1>
                <SchoolTable Schools={Schools} deleteCallback={deleteCallback} />
            </div>
        </BasicLayout>
    )
}