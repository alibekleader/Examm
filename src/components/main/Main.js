import axios from "axios";
import { Plus, Search } from "../../icons";
import Cart from "../cart/Cart";
import "./Main.scss";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
const Main = () => {
  const [data, setData] = useState([]);
  const [orginalData, setorginalData] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const navigation = useNavigate();
  // pagenation

  const startOffset = itemOffset;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(startOffset, endOffset);

  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  // fetch data

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3000/products")
        .then((res) => {
          setData(res.data);
          setorginalData(res.data);
          setTimeout(() => {
            setisloading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, [isloading]);

  // search results

  const search = (e) => {
    let value = e.target.value.toLowerCase();
    const filteredData = orginalData?.filter((el) => {
      return (
        el?.title?.toLowerCase().includes(value) ||
        el?.description?.toLowerCase().includes(value) ||
        el?.brand?.toLowerCase().includes(value) ||
        el?.category?.toLowerCase().includes(value)
      );
    });
    setData(filteredData);
  };

  const add = () => {
    navigation("/add/product");
  };

  return (
    <>
      {isloading ? <Loading /> : ""}
      <main>
        <div className="">
          <div className="main_w">
            <div className="main_top">
              <h3>Все товары ({data?.length})</h3>
              <div className="search">
                <Search />
                <input type="text" placeholder="Поиск" onChange={search} />
              </div>
            </div>
            <div className="hr">
              <div className="border"></div>
            </div>
            <div className="main_top_item">
              <p>Наименование</p>
              <p>Артикул</p>
              <p>Бренд</p>
              <p>Цена</p>
              <p>Цена со скидкой</p>
              <p></p>
            </div>
            <div className="cart_w">
              {currentItems?.map((el, i) => (
                <Cart data={setisloading} key={i} {...el} />
              ))}
              <div className="pagenation">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<GrNext />}
                  onPageChange={({ selected }) => handlePageClick(selected)}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel={<GrPrevious />}
                  marginPagesDisplayed={2}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <button className="addBtn" onClick={add}>
        <Plus /> Новый товар
      </button>
    </>
  );
};

export default Main;
