import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  calculateDiscountedPrice,
  formatDistance,
  roundPriceToHundreds,
} from "../utils";
import { CarClassItem } from "../types";
import Filter from "../components/Filter";

export type FiltersState = {
  carType: string[];
  tags: string[];
  region: string[];
  price: string;
};

const initialFiltersState: FiltersState = {
  carType: [],
  tags: [],
  region: [],
  price: "",
};

const getSortedCarClasses = (
  carClasses: CarClassItem[],
  priceFilter: string
) => {
  if (priceFilter === "낮은 가격순") {
    return [...carClasses].sort(
      (a, b) =>
        calculateDiscountedPrice(a.price, a.discountPercent) -
        calculateDiscountedPrice(b.price, b.discountPercent)
    );
  } else if (priceFilter === "높은 가격순") {
    return [...carClasses].sort(
      (a, b) =>
        calculateDiscountedPrice(b.price, b.discountPercent) -
        calculateDiscountedPrice(a.price, a.discountPercent)
    );
  }
  return carClasses;
};

const ListPage = () => {
  const [carClasses, setCarClasses] = useState<CarClassItem[]>([]);
  const [filters, setFilters] = useState<FiltersState>(initialFiltersState);

  useEffect(() => {
    fetch("https://spelar.github.io/car-list-filter/db.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCarClasses(data.carClasses);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("데이터 로딩 중 오류가 발생했습니다: " + error.message);
      });
  }, []);

  const isFilterMatch = (car: CarClassItem): boolean => {
    const carTypeMatch =
      filters.carType.length === 0 || filters.carType.includes(car.carModel);
    const tagMatch =
      filters.tags.length === 0 ||
      filters.tags.every(
        (tag) => car.carTypeTags && car.carTypeTags.includes(tag)
      );
    const regionMatch =
      filters.region.length === 0 ||
      filters.region.some((region) => car.regionGroups.includes(region));

    return carTypeMatch && tagMatch && regionMatch;
  };

  const sortedCarClasses = getSortedCarClasses(carClasses, filters.price);
  const filteredCarClasses = sortedCarClasses.filter(isFilterMatch);

  if (!carClasses.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>차량 리스트</h1>
      <nav aria-label="차량 필터 옵션">
        <Filter setFilters={setFilters} />
      </nav>
      <section aria-label="차량 목록">
        <CarList>
          {filteredCarClasses.length > 0 ? (
            filteredCarClasses.map((car) => (
              <CarItem key={car.carClassId}>
                <CarImageContainer>
                  <CarImage src={car.image} alt={car.carClassName} />
                </CarImageContainer>
                <CarDetails>
                  <CarInfoContainer>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h2>{car.carClassName}</h2>
                      {car.carTypeTags?.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </CarInfoContainer>
                  <div>
                    {car.discountPercent > 0 ? (
                      <p>
                        {calculateDiscountedPrice(
                          car.price,
                          car.discountPercent
                        ).toLocaleString()}
                        원 (-{car.discountPercent}%)
                      </p>
                    ) : (
                      <p>
                        {roundPriceToHundreds(car.price).toLocaleString()}원
                      </p>
                    )}
                    {car.year}년 | {formatDistance(car.drivingDistance)}km |{" "}
                    {car.regionGroups &&
                      Array.from(
                        car.regionGroups.flatMap((region) => region.split("/"))
                      ).join(", ")}
                  </div>
                </CarDetails>
              </CarItem>
            ))
          ) : (
            <NoCarMessage>
              선택하신 조건에 맞는 차량이 없습니다.
              <br />
              준비된 다른 차량을 확인해 보세요!
            </NoCarMessage>
          )}
        </CarList>
      </section>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  padding: 20px;
  max-width: 420px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const CarList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarItem = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
`;

const CarImageContainer = styled.div`
  display: flex;
  height: 200px;
  background-color: #f4f4f4;
  justify-content: center;
  align-items: center;
`;

const CarImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const CarDetails = styled.div`
  margin: 10px 0px;
  padding: 0 10px;
  text-align: left;
`;

const CarInfoContainer = styled.div`
  display: flex;
  justify-content: left;
`;

const Badge = styled.span`
  margin-right: 5px;
  padding: 3px 6px;
  color: #333;
  font-size: 0.8em;
  background-color: #efefef;
  border-radius: 4px;
  &:first-of-type {
    margin-left: 10px;
  }
`;

const NoCarMessage = styled.div`
  padding: 20px;
  color: #666;
  text-align: center;
  font-size: 1rem;
`;

export default ListPage;
