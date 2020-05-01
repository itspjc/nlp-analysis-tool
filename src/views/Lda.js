import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const data2 = [
  {
    name: "Page A",
    uv: 3000,
    pv: 1400,
  },
  {
    name: "Page B",
    uv: 2000,
    pv: 398,
  },
  {
    name: "Page C",
    uv: 1000,
    pv: 10800,
  },
  {
    name: "Page D",
    uv: 3780,
    pv: 4908,
  },
  {
    name: "Page E",
    uv: 2890,
    pv: 6800,
  },
  {
    name: "Page F",
    uv: 3390,
    pv: 1800,
  },
  {
    name: "Page G",
    uv: 5490,
    pv: 7300,
  },
];

export default function WordCloud() {
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [barData, setBarData] = useState(data);

  const handleChange = (event) => {
    setAge(event.target.value);
    setBarData(data2);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>2020년 LG Way Survey 분석결과</h1>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">본부</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">조직1</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">조직2</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">직급</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                <div align="left">
                  <h2>TOPIC{value}</h2>
                  <p>...</p>
                </div>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <Paper className={classes.paper}>
          <BarChart width={730} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </Paper>
      </Grid>
    </Grid>
  );
}
