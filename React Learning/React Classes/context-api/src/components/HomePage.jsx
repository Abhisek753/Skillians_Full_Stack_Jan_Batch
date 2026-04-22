import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { DataContext } from "../context/DataContext";

const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const {data} =useContext(DataContext);

  return (
    <div
      style={{
          display:"grid",
          gridTemplateColumns:"repeat(3,1fr)",
        backgroundColor: theme === "light" ? "#f5f5f5f5" : "#1a1a1a",
        color: theme == "light" ? "#000000" : "#ffffff",
        minHeight: "100vh",
        padding: "5px",
      }}
    >
  
      {/* <Card
        style={{
          width: "18rem",
         backgroundColor: theme === "light" ? "#f5f5f5f5" : "#1a1a1a",
           color: theme == "light" ? "#000000" : "#ffffff",
           border: theme === "light" ? "2px solid #1a1a1a" : "2px solid #f5f5f5f5",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">Card title</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Card subtitle
          </CardSubtitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card‘s content.
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card> */}
      {data?.map((el)=>(
      <Card
        style={{
        height:"400px",
          width: "18rem",
         backgroundColor: theme === "light" ? "#f5f5f5f5" : "#1a1a1a",
           color: theme == "light" ? "#000000" : "#ffffff",
           border: theme === "light" ? "2px solid #1a1a1a" : "2px solid #f5f5f5f5",
        }}
      >
        <img alt="Sample" src="https://picsum.photos/300/200" />
        <CardBody>
          <CardTitle tag="h5">  {el.name}</CardTitle>
          
          <CardText>
       {el.description}
          </CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
      ))}
      
    </div>
  );
};

export default HomePage;
