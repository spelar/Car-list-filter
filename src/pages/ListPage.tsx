import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  calculateDiscountedPrice,
  formatDistance,
  roundPriceToHundreds,
} from "../utils";
import { CarClassItem } from "../types";
import Filter from "../components/Filter";

const ListPage = () => {
  const [carClasses, setCarClasses] = useState<CarClassItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/carClasses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오는 데 실패했습니다.");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setCarClasses(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        alert("데이터 로딩 중 오류가 발생했습니다: " + error.message);
      });
  }, []);

  if (!carClasses.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>차량 리스트</h1>
      <nav aria-label="차량 필터 옵션">
        <Filter />
      </nav>
      <section aria-label="차량 목록">
        <CarList>
          {carClasses.map((car) => (
            <CarItem key={car.carClassId}>
              <CarImageContainer>
                <CarImage src={car.image} alt={car.carClassName} />
              </CarImageContainer>
              <CarDetails>
                <CarInfoContainer>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h2>{car.carClassName}</h2>
                    {car.carTypeTags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </CarInfoContainer>
                <p>
                  {car.discountPercent > 0 ? (
                    <p>
                      {calculateDiscountedPrice(
                        car.price,
                        car.discountPercent
                      ).toLocaleString()}
                      원 (-{car.discountPercent}%)
                    </p>
                  ) : (
                    <p>{roundPriceToHundreds(car.price).toLocaleString()}원</p>
                  )}
                  {car.year}년 | {formatDistance(car.drivingDistance)}km |{" "}
                  {Array.from(
                    car.regionGroups.flatMap((region) => region.split("/"))
                  ).join(", ")}
                </p>
              </CarDetails>
            </CarItem>
          ))}
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
  margin-top: 10px;
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

export default ListPage;
