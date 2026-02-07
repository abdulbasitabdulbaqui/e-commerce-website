import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import laptop from "../assets/laptop.jpeg";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useSearchParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const searched = data.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  const datas = searched.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(searched.length / itemsPerPage);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:8000/api/products");
        console.log(response);
        setData(response?.data?.products);
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setIsLoading(false); // ALWAYS stop loading
      }
    };
    fetch();
  }, []);

  const changePage = (page) => {
    setSearchParams({ page, search });
  };

  const handleSearch = (e) => {
    setSearchParams({ page: 1, search: e.target.value });
  };

  const visiblePages = 5;

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + visiblePages - 1, totalPage);

  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }
  if (currentPage < 1 || currentPage > totalPage) {
    return <PageNotFound />;
  }
  return (
    <>
      <Col>
        <Form.Control
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search"
          className="mt-3 w-25 ms-5"
        />
      </Col>
      {isLoading && (
        <h2 className="d-flex justify-content-center align-items-center mt-4">
          LOADING...
        </h2>
      )}
      <div className="d-flex flex-wrap gap-3 justify-content-center mt-3 ">
        {datas.map((item) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={laptop} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Title>{item.brand}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Title>{item.price}</Card.Title>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div className="d-flex justify-content-center mt-2">
        <div className="d-flex justify-content-center mt-3">
          <ButtonGroup>
            <Button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
            >
              Prev
            </Button>
            {/* Page Numbers */}
            {[...Array(endPage - startPage + 1)].map((_, i) => {
              const pageNumber = startPage + i;

              return (
                <Button
                  key={pageNumber}
                  variant={
                    currentPage === pageNumber ? "primary" : "outline-primary"
                  }
                  onClick={() => changePage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            {/* Next */}
            <Button
              disabled={currentPage === totalPage}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};
export default Products;
