import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AdminUsers = () => {
  const [tourists, setTourists] = useState([]);
  const [guide, setGuide] = useState([]);
  const [seller, setSeller] = useState([]);

  useEffect(() => {
    const touristlist = async () => {
      const response = await fetch("http://localhost:8000/user/user-list");
      const data = await response.json();

      if (data.length > 0) {
        setTourists(data);
      }
      console.log(data);
    };

    const guidelist = async () => {
      const response = await fetch("http://localhost:8000/user/guide-list");
      const data = await response.json();

      if (data.length > 0) {
        setGuide(data);
      }
    };

    const sellerlist = async () => {
      const response = await fetch("http://localhost:8000/user/seller-list");
      const data = await response.json();

      if (data.length > 0) {
        setSeller(data);
      }
    };

    touristlist();
    guidelist();
    sellerlist();
  }, []);

  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right">
          <h2>Tourists</h2>

          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tourist ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Nationality</TableCell>
                  <TableCell>Preference</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tourists.length > 0 ? (
                  tourists.map((tourist) => (
                    <TableRow key={tourist.id}>
                      <TableCell>{tourist.id}</TableCell>
                      <TableCell>{tourist.name}</TableCell>
                      <TableCell>
                        <img src={tourist.image} alt="" width={"100px"} />
                      </TableCell>
                      <TableCell>{tourist.email}</TableCell>
                      <TableCell>{tourist.address}</TableCell>
                      <TableCell>{tourist.nationality}</TableCell>
                      <TableCell>{tourist.preferredplace}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />
          <br />

          <h2>Guides</h2>

          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Guide ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Charge</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guide.length > 0 ? (
                  guide.map((guide) => (
                    <TableRow key={guide.id}>
                      <TableCell>{guide.id}</TableCell>
                      <TableCell>{guide.name}</TableCell>
                      <TableCell>
                        <img src={guide.image} alt="" width={"100px"} />
                      </TableCell>
                      <TableCell>{guide.description}</TableCell>
                      <TableCell>{guide.email}</TableCell>
                      <TableCell>{guide.phone}</TableCell>
                      <TableCell>{guide.address}</TableCell>
                      <TableCell>{guide.tag}</TableCell>
                      <TableCell>{guide.charge}</TableCell>
                      <TableCell>{guide.rating}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={10}>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          <br />
          <br />

          <h2>Sellers</h2>

          <TableContainer>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Seller ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Photo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {seller.length > 0 ? (
                  seller.map((seller) => (
                    <TableRow key={seller.id}>
                      <TableCell>{seller.id}</TableCell>
                      <TableCell>{seller.name}</TableCell>
                      <TableCell>
                        <img src={seller.image} alt="" width={"100px"} />
                      </TableCell>
                      <TableCell>{seller.email}</TableCell>
                      <TableCell>{seller.sellertype}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={5}>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <br />
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
