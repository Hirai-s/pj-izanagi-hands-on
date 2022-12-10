import { useRouter } from "next/router";
import type { NextPage } from "next";
import Container from '@mui/material/Container';
import { Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";

import { useGetCalenderListQuery, useGetDepartmentQuery, useGetEmployeesQuery, useGetOperationListQuery } from "../../@generated/graphql";
import createGqlClient from "../../utils/createGqlClient";
import DailyRowComponents from "../../components/DailyRowComponents";

const MainPage: NextPage = () => {

  const router = useRouter();
  // パスパラメータから値を取得
  const { employees_id } = router.query;
  
  //GraphQL用クライアントの作成
  const gqlClient = createGqlClient()

  //ユーザ情報を取得
  const {data: employeesData, isLoading:isLoadingEmployees} = useGetEmployeesQuery (
    gqlClient,
    {
      where: {
        employees_id: Number(employees_id)
      }
    }
  )
  const userName = employeesData?.Employees?.employees_name

  //所属情報を取得
  const {data:deparmentData, isLoading:isLoadingDepartment} = useGetDepartmentQuery (
    gqlClient,
    {
      where: {
        department_id: employeesData?.Employees?.department_id
      }
    },
    {
      enabled: !isLoadingEmployees
    }
  )
  const departmentName = deparmentData?.Department?.department_name

  //作業リストの取得
  const {data:operationData, isLoading:isLoadingtOperation}= useGetOperationListQuery (
    gqlClient,
    {
      where: {}
    }
  )

  // 今月のカレンダー日付、暫定的に定義
  const {data: calenderDays, isLoading:isLoadingCalender} = useGetCalenderListQuery(
    gqlClient,
    {
      where: {
        year_month: {
          equals: "202211" 
        },
      },
    }
  )

  return(
    <Container>
      <Typography variant="h3" component="div">
        就業管理登録画面
      </Typography>

      <Paper>
        <Typography variant="subtitle1" component="div">
          ユーザ情報
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={4}>
            <TextField
              label="所属"
              defaultValue={"所属"}
              value={departmentName}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              label="名前"
              defaultValue={"名前"}
              value={userName}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper>
        <Typography variant="subtitle1" component="div">
          就業情報
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>曜日</TableCell>
                <TableCell>開始時間</TableCell>
                <TableCell>終了時間</TableCell>
                <TableCell>作業内容１</TableCell>
                <TableCell>作業内容１時間</TableCell>
                <TableCell>作業内容２</TableCell>
                <TableCell>作業内容２時間</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calenderDays?.CalendarList.sort((n1, n2) => (n2.day < n1.day ? 1 : -1))
                .map((calenderDay) => (
                  <DailyRowComponents
                    yearMonth={calenderDay.year_month} 
                    day={calenderDay.day}
                    key={calenderDay.day}
                  />  
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  )
};

export default MainPage;