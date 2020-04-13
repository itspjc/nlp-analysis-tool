// import React from "react";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// export default function SentimentAnalyzer() {
export default function SentimentAnalyzer() {
  // const classes = useStyles();
  // };
  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiTextField-root": {
        // margin: theme.spacing(2),
        // width: "150ch",
        // width: "90%",
      },
    },
  }));
  const classes = useStyles();
  const [resultPoint, setResultPoint] = useState("");
  const [resultEmotion, setResultEmotion] = useState("neutral");
  const [yourText, setYourText] = useState("");
  // const [page, setPage] = useState(1);
  // const [commitHistory, setCommitHistory] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const loadMoreCommit = () => {
  //   setPage(page + 1);
  // };

  // useEffect(() => {
  //   fetch(`http://localhost:5000`, {
  //     method: "GET",
  //     headers: new Headers({
  //       Accept: "application/vnd.github.cloak-preview",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       // setCommitHistory(response.items);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => console.log(error));
  // }, [page]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: yourText }),
    };
    fetch(`http://localhost:5000/inference`, requestOptions)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setResultPoint(response.positive_rate);
        setResultEmotion(response.emotion);
        // setCommitHistory(response.items);
        // setIsLoading(false);
      });
    // body: JSON.stringify({ email, comment }),
  };

  return (
    <div>
      <h1>한국어 감정분석</h1>
      <h3>
        한국어 텍스트의 감정분석을 할 수 있습니다. 원하는 텍스트를 입력해
        보세요.
      </h3>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ float: "right", fontSize: "18px", marginBottom: "20px" }}
          >
            분석하기
          </Button>
          <TextField
            value={yourText}
            onChange={(e) => setYourText(e.target.value)}
            placeholder="Placeholder"
            id="outlined-multiline-static"
            label="한국어 텍스트의 감정분석을 할 수 있습니다. 원하는 텍스트를 입력해 보세요."
            multiline
            rows={5}
            variant="outlined"
            style={{
              backgroundColor: "white",
            }}
            inputProps={{
              style: { fontSize: 20 },
            }}
            fullWidth
          />
        </div>
      </form>
      <p style={{ float: "left", fontSize: "20px" }}>
        위 문장은{" "}
        <span
          style={{
            color:
              resultEmotion === "positive"
                ? "green"
                : resultEmotion === "negative"
                ? "red"
                : "black",
          }}
        >
          {resultPoint}
        </span>
        % 확률로 <b>긍정적인 감정</b>을 담고 있는 문장입니다.
      </p>
    </div>
  );
}
