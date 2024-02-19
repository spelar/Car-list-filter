import styled from "@emotion/styled";

function Filter() {
  return (
    <FilterSection>
      <button>차종 분류</button>
      <button>지역</button>
      <button>가격</button>
      <button>빠른대여</button>
      <button>신차</button>
      <button>인기</button>
      <button>특가</button>
      <button>프리미엄</button>
    </FilterSection>
  );
}

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
