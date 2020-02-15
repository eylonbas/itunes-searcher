using System;
using System.Collections.Generic;
using System.Linq;
using Npgsql;
using System.Web.Script.Serialization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace itunes_searcher.Controllers
{
    [Route("api/[controller]")]
    public class SearcherController : Controller
    {
        private static string connectionStringFormat =
            "Server={0};Port={1};User Id={2};Password={3};Database={4};";
        private static string connectionString = String.Format(
            connectionStringFormat,
            "localhost", 5432, "postgres",
            "123456789", "postgres");

        private static NpgsqlConnection conn =
            new NpgsqlConnection(connectionString);
        private NpgsqlCommand cmd;
        private DataTable dt;

        [Route("GetTopTenSearchQueries")]
        [HttpGet]
        public string GetTopTenSearchQueries()
        {
            try
            {
                conn.Open();
                string sqlQuery = "select * from sh_select_top_10()";
                cmd = new NpgsqlCommand(sqlQuery, conn);
                dt = new DataTable();
                dt.Load(cmd.ExecuteReader());
                conn.Close();

                return new JavaScriptSerializer()
                    .Serialize(ConvertTableToArray(dt));
            }
            catch (Exception ex)
            {
                conn.Close();
                // log error
                throw ex;
            }
        }

        private List<SearchedQuery> ConvertTableToArray(DataTable dt)
        {
            return (from rw in dt.AsEnumerable()
                    select new SearchedQuery()
                    {
                        Query = Convert.ToString(rw["_search_query"]),
                        SearchCount = Convert.ToInt32(rw["_search_count"])
                    }).ToList();
        }

        [Route("SearchQuery")]
        [HttpPost]
        public void SearchQuery([FromBody] SearchedQuery query)
        {
            try
            {
                conn.Open();
                string sqlQuery = "select * from sh_insert(@_search_query)";
                cmd = new NpgsqlCommand(sqlQuery, conn);
                cmd.Parameters.AddWithValue("_search_query", query.Query);
                int result = (int)cmd.ExecuteScalar();
                if (result == 0)
                {
                    // log error
                }
                conn.Close();
            }
            catch (Exception ex)
            {
                conn.Close();
                // log error
                throw ex;
            }
        }

        public class SearchedQuery
        {
            public string Query { get; set; }
            public int SearchCount { get; set; }
        }
    }
}
