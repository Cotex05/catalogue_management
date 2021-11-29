import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Dropdown, DropdownButton, Form, FormControl, Nav, Navbar, Row, Button, Modal, ProgressBar } from 'react-bootstrap';
import Product from './components/Product';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {

  // state handling
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // API call for fetching all products data
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/")
      .then(res => {
        setProducts(res.data);
        setAllProducts(res.data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [])

  // Counting product's categories
  useEffect(() => {
    var count = [0, 0, 0, 0];
    axios.get("https://fakestoreapi.com/products/")
      .then(res => {
        res.data.forEach(item => {
          if (item.category === "electronics") {
            count[0]++;
          } else if (item.category === "jewelery") {
            count[1]++;
          } else if (item.category === "men's clothing") {
            count[2]++;
          } else if (item.category === "women's clothing") {
            count[3]++;
          }
        });
        setData(count);
      })
      .catch(err => console.log(err));
  }, [])

  // selection of category handling
  const selectCategory = (type) => {
    if (type === "e") {
      setCategory("electronics");
    } else if (type === "j") {
      setCategory("jewelery")
    } else if (type === "m") {
      setCategory("men's clothing")
    } else if (type === "w") {
      setCategory("women's clothing")
    }
  }

  // Modal Handling
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For category selction, changes of data using useEffect
  useEffect(() => {
    setSelectTitle(category);
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, [category]);

  // dataset for pie chart
  const dataSet = {
    labels: ['electronics', 'jewelery', 'mens fashion', 'womens fashion'],
    datasets: [
      {
        label: 'Total',
        data: data,
        backgroundColor: [
          'rgba(255, 50, 52, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(255, 206, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
        ],
        borderColor: [
          'rgba(255, 50, 52, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // handling the search 
  const handleSearch = (e) => {
    e.preventDefault();
    const newProducts = allProducts.filter(item => {
      if (item.title.toLocaleLowerCase().search(query) !== -1) {
        return 1;
      } else {
        return 0;
      }
    });
    if (newProducts.length === 0) {
      alert("Product not found!");
      return;
    } else {
      setProducts(newProducts); // filtered products only
    }
    // console.log(newProducts);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="primary" expand="lg">
          <Container fluid>
            <Navbar.Brand style={{ color: "#fff" }} href="/">Catalogue</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
              </Nav>
              <Form className="d-flex">
                <DropdownButton id="dropdown-basic-button" title={selectTitle === "" ? "Select Category" : selectTitle}>
                  <Dropdown.Item><Button variant="light" onClick={() => selectCategory("e")}>Electronics</Button></Dropdown.Item>
                  <Dropdown.Item><Button variant="light" onClick={() => selectCategory("j")}>Jewelery</Button></Dropdown.Item>
                  <Dropdown.Item><Button variant="light" onClick={() => selectCategory("m")}>Men's clothing</Button></Dropdown.Item>
                  <Dropdown.Item><Button variant="light" onClick={() => selectCategory("w")}>Women's clothing</Button></Dropdown.Item>
                </DropdownButton>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-4 mx-4"
                  aria-label="Search"
                  value={query}
                  onChange={e => { e.preventDefault(); setQuery(e.target.value); }}
                />
                <Button variant="outline-light" className="btn-sm" onClick={handleSearch}>Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <div className="outerBox">
        <Container fluid>
          <ProgressBar striped animated variant="primary" now={100} style={{ display: loading ? 'flex' : 'none' }} />
          <Row lg={4} md={3} sm={2} xs={1}>
            {products.map(item => {
              return (
                <Product
                  key={item.id}
                  title={item.title}
                  desc={item.description}
                  img={item.image}
                  category={item.category}
                  price={item.price}
                />
              )
            })}
          </Row>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Categories in Catalogue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Pie data={dataSet} />
          </Modal.Body>
        </Modal>
      </div>
      <Button style={{ position: "fixed", bottom: "0px", right: "0px", margin: "12px", backgroundColor: "rgba(0,100,250,0.8)" }} onClick={handleShow}>Analyze</Button>
    </div>
  );
}

export default App;
