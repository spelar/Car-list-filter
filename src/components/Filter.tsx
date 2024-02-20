import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import FilterPopup from "./FilterPopup";

function Filter() {
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    if (activeFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeFilter]);

  const handleFilterClick = (filterName: string) => {
    setActiveFilter(filterName);
  };

  const closePopup = () => {
    setActiveFilter("");
  };

  return (
    <>
      {activeFilter && <Overlay />}
      <FilterSection>
        <button>초기화</button>
        <button onClick={() => handleFilterClick("carType")}>차종 분류</button>
        <button onClick={() => handleFilterClick("region")}>지역</button>
        <button onClick={() => handleFilterClick("price")}>가격</button>
        <button>빠른대여</button>
        <button>신차</button>
        <button>인기</button>
        <button>특가</button>
        <button>프리미엄</button>
        {activeFilter && (
          <FilterPopup filterType={activeFilter} closePopup={closePopup} />
        )}
      </FilterSection>
    </>
  );
}

const Overlay = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const FilterSection = styled.section`
  overflow-x: auto;
  display: flex;
  margin-bottom: 20px;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #000;
    background: none;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Filter;
