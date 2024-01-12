# 0109 DB&SQL assignment

# SQL assignment

1. 전체 구매 고객에 대하여 고객별 총구매 금액 출력하기

```sql
SELECT c.CustomerID, c.CustomerName, SUM(od.Quantity * p.Price) AS "구매금액"
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
GROUP BY c.CustomerID, c.CustomerName;
```

1. 2000개 이상의 판매가 이루어진 카테고리 이름과 총 판매량, 총 판매 금액을 내림차순으로 출력하기

```sql
SELECT CategoryName, SUM(od.Quantity) AS "판매량", SUM(od.Quantity * p.Price) AS "판매금액"
FROM Categories c
JOIN Products p ON c.CategoryID = p.CategoryID
JOIN OrderDetails od ON p.ProductID = od.ProductID
GROUP BY c.CategoryID
HAVING SUM(od.Quantity) > 2000
ORDER BY SUM(od.Quantity) DESC;
```

1. ‘Seafood’보다 더 많은 판매금액을 기록한 카테고리 이름과 총 판매량, 총 판매 금액을 내림차순으로 출력하기

```sql
SELECT CategoryName, SUM(od.Quantity) AS "판매량", SUM(od.Quantity * p.Price) AS "판매금액"
FROM Categories c
JOIN Products p ON c.CategoryID = p.CategoryID
JOIN OrderDetails od ON p.ProductID = od.ProductID
GROUP BY c.CategoryID
HAVING SUM(od.Quantity * p.Price) > (
	SELECT SUM(od.Quantity * p.Price)
	FROM Categories c
	JOIN Products p ON c.CategoryID = p.CategoryID
	JOIN OrderDetails od ON p.ProductID = od.ProductID
	WHERE c.CategoryName = 'Seafood'
)
ORDER BY SUM(od.Quantity) DESC;
```

# DB normalization

파란색이 table의 PRIMARY KEY이고, 빨간색이 FOREIGN KEY입니다. PRIMARY KEY이면서 FOREIGN KEY이면 초록색으로 표시했습니다.

## 1NF

| 배우 | 성별 | 출생 | 영화 | 개봉 | 감독 | 감독 출생 | 배역 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 강동원 | 남 | 1981 | 늑대의 유혹 | 2004 | 김태균 | 1960 | 정태성 |
| 강동원 | 남 | 1981 | 전우치 | 2009 | 최동훈 | 1971 | 전우치 |
| 강동원 | 남 | 1981 | 검사외전 | 2016 | 이일형 | 1981 | 한치원 |
| 김윤석 | 남 | 1967 | 전우치 | 2009 | 최동훈 | 1971 | 화담 |
| 김윤석 | 남 | 1967 | 도둑들 | 2012 | 최동훈 | 1971 | 마카오 박 |
| 김혜수 | 여 | 1970 | 도둑들 | 2012 | 최동훈 | 1971 | 팹시 |
| 김혜수 | 여 | 1970 | 관상 | 2013 | 한재림 | 1975 | 연홍 |
| 이정재 | 남 | 1972 | 도둑들 | 2012 | 최동훈 | 1971 | 뽀빠이 |
| 이정재 | 남 | 1972 | 신세계 | 2013 | 박훈정 | 1975 | 이자성 |
| 이정재 | 남 | 1972 | 관상 | 2013 | 한재림 | 1975 | 수양대군 |
| 이정재 | 남 | 1972 | 암살 | 2015 | 최동훈 | 1971 | 염석진 |
| 전지현 | 여 | 1981 | 도둑들 | 2012 | 최동훈 | 1971 | 예니콜 |
| 전지현 | 여 | 1981 | 암살 | 2015 | 최동훈 | 1971 | 안옥윤 |
| 황정민 | 남 | 1970 | 신세계 | 2013 | 박훈정 | 1975 | 정청 |
| 황정민 | 남 | 1970 | 검사외전 | 2016 | 이일형 | 1981 | 변재욱 |

## 2NF

| 배우 | 성별 | 출생 |
| --- | --- | --- |
| 강동원 | 남 | 1981 |
| 김윤석 | 남 | 1967 |
| 김혜수 | 여 | 1970 |
| 이정재 | 남 | 1972 |
| 전지현 | 여 | 1981 |
| 황정민 | 남 | 1970 |

| 영화 | 개봉 | 감독 | 감독 출생 |
| --- | --- | --- | --- |
| 늑대의 유혹 | 2004 | 김태균 | 1960 |
| 전우치 | 2009 | 최동훈 | 1971 |
| 검사외전 | 2016 | 이일형 | 1981 |
| 도둑들 | 2012 | 최동훈 | 1971 |
| 관상 | 2013 | 한재림 | 1975 |
| 신세계 | 2013 | 박훈정 | 1975 |
| 암살 | 2015 | 최동훈 | 1971 |

| 배우 | 영화 | 배역 |
| --- | --- | --- |
| 강동원 | 늑대의 유혹 | 정태성 |
| 강동원 | 전우치 | 전우치 |
| 강동원 | 검사외전 | 한치원 |
| 김윤석 | 전우치 | 화담 |
| 김윤석 | 도둑들 | 마카오 박 |
| 김혜수 | 도둑들 | 팹시 |
| 김혜수 | 관상 | 연홍 |
| 이정재 | 도둑들 | 뽀빠이 |
| 이정재 | 신세계 | 이자성 |
| 이정재 | 관상 | 수양대군 |
| 이정재 | 암살 | 염석진 |
| 전지현 | 도둑들 | 예니콜 |
| 전지현 | 암살 | 안옥윤 |
| 황정민 | 신세계 | 정청 |
| 황정민 | 검사외전 | 변재욱 |

## 3NF/BCNF

| 배우 | 성별 | 출생 |
| --- | --- | --- |
| 강동원 | 남 | 1981 |
| 김윤석 | 남 | 1967 |
| 김혜수 | 여 | 1970 |
| 이정재 | 남 | 1972 |
| 전지현 | 여 | 1981 |
| 황정민 | 남 | 1970 |

| 영화 | 개봉 | 감독 |
| --- | --- | --- |
| 늑대의 유혹 | 2004 | 김태균 |
| 전우치 | 2009 | 최동훈 |
| 검사외전 | 2016 | 이일형 |
| 도둑들 | 2012 | 최동훈 |
| 관상 | 2013 | 한재림 |
| 신세계 | 2013 | 박훈정 |
| 암살 | 2015 | 최동훈 |

| 감독 | 감독 출생 |
| --- | --- |
| 김태균 | 1960 |
| 최동훈 | 1971 |
| 이일형 | 1981 |
| 최동훈 | 1971 |
| 한재림 | 1975 |
| 박훈정 | 1975 |
| 최동훈 | 1971 |

| 배우 | 영화 | 배역 |
| --- | --- | --- |
| 강동원 | 늑대의 유혹 | 정태성 |
| 강동원 | 전우치 | 전우치 |
| 강동원 | 검사외전 | 한치원 |
| 김윤석 | 전우치 | 화담 |
| 김윤석 | 도둑들 | 마카오 박 |
| 김혜수 | 도둑들 | 팹시 |
| 김혜수 | 관상 | 연홍 |
| 이정재 | 도둑들 | 뽀빠이 |
| 이정재 | 신세계 | 이자성 |
| 이정재 | 관상 | 수양대군 |
| 이정재 | 암살 | 염석진 |
| 전지현 | 도둑들 | 예니콜 |
| 전지현 | 암살 | 안옥윤 |
| 황정민 | 신세계 | 정청 |
| 황정민 | 검사외전 | 변재욱 |