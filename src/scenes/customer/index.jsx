import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInterceptor";
import Button from '@mui/material/Button';
import ConfirmationDialog from '../../components/deleteModal/ResponsiveDialog';
import ChannelPartnerModal from '../../components/modal/KeepMountedModal';
import * as Yup from 'yup';
import { useFormik } from 'formik';



const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const [channelPartner, setChannelPartner] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [itemToDelete, setItemToDelete] = useState('');

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(20); // pageSize is predefined
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (page = pageNumber) => {
    try {
      const response = await axiosInstance.get(`/api/customer?pageNumber=${page}`);
      const { content, page: pageData } = response.data.detail;
  
      setData(content);
      setTotalRows(pageData.totalElements);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  useEffect(() => {
    fetchData(); // Fetch data on initial render and when pageNumber changes
  }, [pageNumber]);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handleOpen = (partner = {}) => {
    setChannelPartner(partner);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async (values) => {
    try {
      if (values.id) {
        await axiosInstance.post(`/api/customer/edit`, values);
      } else {
        await axiosInstance.post('/api/customer', values);
      }
      // fetchData();
      fetchData(pageNumber);
      handleClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteItemId(id);
    setItemToDelete(name);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteItemId) {
        await axiosInstance.delete(`/api/customer/${deleteItemId}`);
        // fetchData();
        fetchData(pageNumber);
      }
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const columns = [

    { field: 'id', headerName: 'ID', width: 90 }, // Adjust width if needed
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'contactPerson', headerName: 'Contact Person', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'country', headerName: 'Country', flex: 1 },
    { field: 'cellNumber', headerName: 'Cell Number', flex: 1 },
    { field: 'panNo', headerName: 'PAN Number', flex: 1 },
    { field: 'vatNo', headerName: 'VAT Number', flex: 1 },
    { field: 'agreementDate', headerName: 'Agreement Date', flex: 1 },
    { field: 'agreementExpiryDate', headerName: 'Agreement Expiry Date', flex: 1 },
    { field: 'url', headerName: 'URL', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOpen(params.row)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          {/* <Button
            color="secondary"
            variant="contained"
            onClick={() => handleDeleteClick(params.row.id, params.row.name)}
          >
            Delete
          </Button> */}
        </Box>
      ),
    },
  ];


  const onSave = async (values) => {
    try {
      if (values.id) {
        await axiosInstance.put(`/api/customer`, values);
      } else {
        await axiosInstance.post('/api/customer', values);
      }
      fetchData(); // Refresh the data
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  //--------values to pass for the KeepMountedModal----------------

  const formik = useFormik({
    initialValues: {
      id: channelPartner.id || '', // ID for editing
      channelPartnerId: channelPartner.channelPartnerId || '',
      name: channelPartner.name || '',
      address: channelPartner.address || '',

      email: channelPartner.email || '',
      url: channelPartner.url || '',
      contactPerson: channelPartner.contactPerson || '',

      contactNumber: channelPartner.contactNumber || '',
      city: channelPartner.city || '',
      state: channelPartner.state || '',
      country: channelPartner.country || '',
      cellNumber: channelPartner.cellNumber || '',
      panNo: channelPartner.panNo || '',
      vatNo: channelPartner.vatNo || '',
      // agreementDate: channelPartner.agreementDate || '',
      // agreementExpiryDate: channelPartner.agreementExpiryDate || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      contactPerson: Yup.string(),
      contactNumber: Yup.string().matches(/^[0-9]+$/, 'Must be a valid contact number').required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      address: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      cellNumber: Yup.string(),
      panNo: Yup.string(),
      vatNo: Yup.string(),
      // agreementDate: Yup.date().nullable(),
      // agreementExpiryDate: Yup.date().nullable(),
      url: Yup.string().url('Invalid URL'),
    }),
    onSubmit: (values) => {
      console.log("Submitted data:", values);
      onSave(values);
      handleClose();
    },
  });

  React.useEffect(() => {
    formik.setValues({
      id: channelPartner.id || '',
      channelPartnerId: channelPartner.channelPartnerId || '',
      name: channelPartner.name || '',
      address: channelPartner.address || '',
      city: channelPartner.city || '',
      state: channelPartner.state || '',
      country: channelPartner.country || '',
      contactNumber: channelPartner.contactNumber || '',
      email: channelPartner.email || '',
      url: channelPartner.url || '',
      contactPerson: channelPartner.contactPerson || '',

      cellNumber: channelPartner.cellNumber || '',
      panNo: channelPartner.panNo || '',
      vatNo: channelPartner.vatNo || '',
      // agreementDate: channelPartner.agreementDate || '',
      // agreementExpiryDate: channelPartner.agreementExpiryDate || '',
    });
  }, [channelPartner]);


  const fields = [
    {
      label: "Channel Partner",
      name: "channelPartnerId",
      type: "dymaicDropDown",
      path: "/api/channelpartner/nameList",
      col: 12,
      required: false,
      selectionType: "id",
    },
    { label: "Name", name: "name", type: "text", col: 12, required: true },
    { label: "Address", name: "address", type: "text", col: 12, required: false },
    { label: "City", name: "city", type: "text", col: 12, required: false },

    { label: "State", name: "state", type: "text", col: 12, required: false },
    { label: "Country", name: "country", type: "text", col: 12, required: false },
    { label: "Contact Number", name: "contactNumber", type: "text", col: 12, required: true },

    { label: "Email", name: "email", type: "email", col: 12, required: true },
    { label: "URL", name: "url", type: "text", col: 12, required: false },
    { label: "Contact Person", name: "contactPerson", type: "text", col: 12, required: false },

    { label: "Cell Number", name: "cellNumber", type: "text", col: 12, required: false },
    { label: "PAN Number", name: "panNo", type: "text", col: 12, required: false },
    { label: "VAT Number", name: "vatNo", type: "text", col: 12, required: false },
    // { label: "Agreement Date", name: "agreementDate", type: "date", col: 12, required: false },
    // { label: "Agreement Expiry Date", name: "agreementExpiryDate", type: "date", col: 12, required: false },
  ];





  return (
    <Box m="20px">
      <Box m="40px 0 0 0" sx={{ height: '75vh', overflowX: 'auto' }}>
        <Button onClick={() => handleOpen()} color="secondary" variant="contained" sx={{ mb: 2 }}>
          Add Customer
        </Button>
        <Box sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            checkboxSelection
            rows={data}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pagination
            pageSize={pageSize}
            paginationMode="server"
            rowCount={totalRows} // Total rows
            onPageChange={handlePageChange}
            autoHeight
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.secondary.main, // Use theme secondary color
                color: '#ffffff', // Customize header text color
              },
            }}
          />

        </Box>
      </Box>


      <ChannelPartnerModal
        channelPartner={channelPartner}
        onSave={handleSave}
        open={open}
        setOpen={setOpen}
        formik={formik}
        fields={fields}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        handleClose={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
        itemName={itemToDelete}
      />
    </Box>
  );
};

export default Invoices;
