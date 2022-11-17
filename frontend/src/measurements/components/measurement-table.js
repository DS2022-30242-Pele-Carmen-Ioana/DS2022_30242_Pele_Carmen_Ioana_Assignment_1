import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Timetamp',
        accessor: 'timestamp',
    },
    {
        Header: 'DateM',
        accessor: 'datem',
    },
    {
        Header: 'Energy Consumption',
        accessor: 'energyConsumption',
    }
];

const filters = [
    {
        accessor: 'id',
    }
];

class MeasurementTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
            />
        )
    }
}

export default MeasurementTable;