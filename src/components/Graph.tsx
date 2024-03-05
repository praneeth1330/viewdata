import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Chart, { ApexChartType } from "react-apexcharts";
import NavBar from "./NavBar";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./graph.scss";

// Define types for graph data
interface GraphData {
  company_name: string;
  principal_business_activity_as_per_cin: string;
  authorized_cap: number;
  paidup_capital: number;
  company_class: string;
  company_status: string;
  registered_state: string;
}
//  RootState interface for Redux store
interface RootState {
  graphs: {
    graphs: GraphData[][];
  };
}
// RouteParams interface for URL parameters
interface RouteParams {
  id: string;
}

interface Props {
  graphs: GraphData[][];
  randomMap: string;
}

type IChartType = "line" | "bar";

// Functional component for displaying graph details
const Graph: React.FC<Props> = ({ graphs }) => {
  //Geting Url parameter
  const { id } = useParams<RouteParams>();
  const [searchParams] = useSearchParams();
  const mapType = searchParams.get("mapType");
  const [searchColor] = useSearchParams();
  const color = searchColor.get("color");
  const decoded = decodeURIComponent(color);

  console.log(mapType);
  console.log("color", decoded);

  // State variables for sorting
  const [sortColumn, setSortColumn] = useState<keyof GraphData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  //Getting graph data based on URL parameter
  const graphData = graphs[parseInt(id)] || [];

  console.log("all graphs page", graphData);

  if (graphData.length === 0) {
    return <div>No data available</div>;
  }

  // Function to handle sorting
  const sortBy = (key: keyof GraphData) => {
    if (sortColumn === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc");
    }
  };

  // Sort graph data based on column and order
  const sortedGraphData = graphData.slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Rendering graph component
  return (
    <div className="single-graph">
      <NavBar />
      <div className="graph-details-page">
        {/* Back button */}
        <div className="back">
          <Link to="/home">
            <MdOutlineArrowBackIosNew className="back-button" />
          </Link>
        </div>
        {/* Graph title */}
        <div className="graph-text">
          <h3>{graphData[0].registered_state}</h3>
        </div>
        <div className="single-graph-container">
          <div className="chart">
            <p>Chart Data of company's</p>

            {/*Rendering charts based on the sorting   */}
            <Chart
              options={{
                chart: {
                  id: `basic-bar-details`,
                },
                xaxis: {
                  categories: sortedGraphData.map((record) =>
                    record.company_name.slice(0, 10)
                  ),
                },
                colors: [color],
              }}
              series={[
                {
                  name: `series-details`,
                  data: sortedGraphData.map((record) => record.paidup_capital),
                },
              ]}
              type={mapType as IChartType}
              className="chart-data"
            />
          </div>
          {/* Table for graph data */}
          <div className="table">
            <p>Tabular data of company's</p>
            <table>
              <thead>
                <tr>
                  {/* Table headers with sorting functionality */}
                  <th onClick={() => sortBy("company_name")}>
                    Company Name{" "}
                    {sortColumn === "company_name" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() =>
                      sortBy("principal_business_activity_as_per_cin")
                    }
                  >
                    Business{" "}
                    {sortColumn === "principal_business_activity_as_per_cin" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("authorized_cap")}>
                    Capital{" "}
                    {sortColumn === "authorized_cap" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("paidup_capital")}>
                    Paid-up Capital{" "}
                    {sortColumn === "paidup_capital" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("company_class")}>
                    Class{" "}
                    {sortColumn === "company_class" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th onClick={() => sortBy("company_status")}>
                    Company Status{" "}
                    {sortColumn === "company_status" &&
                      (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedGraphData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.company_name.slice(0, 10)}</td>
                    <td>{record.principal_business_activity_as_per_cin}</td>
                    <td>{record.authorized_cap}</td>
                    <td>{record.paidup_capital}</td>
                    <td>{record.company_class}</td>
                    <td
                      className={
                        record.company_status === "ACTV" ||
                        record.company_status === "Active"
                          ? "active"
                          : "inactive"
                      }
                    >
                      {record.company_status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="company-details">
            <h3>
              The Company's Master Data of {graphData[0].registered_state}
            </h3>
            <div className="company-data">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
                aliquam fugit facilis odio nihil ut quibusdam eum dolore. Ab
                fugit eaque, necessitatibus totam sed unde ad. Pariatur neque
                iste iusto.
              </p>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                tempora optio officia voluptatum aliquam magnam saepe dolorum
                odio, esse corporis dolores facere maxime accusantium culpa
                voluptates laborum aut enim nisi recusandae pariatur? Autem,
                quod! Quae voluptatum hic aut obcaecati sunt asperiores
                consequuntur unde dolore! Voluptas ipsam eveniet dolor
                voluptate. Sint mollitia molestias eum laudantium placeat
                inventore ad ab facere, excepturi et! Obcaecati et voluptate
                eligendi? Eveniet eligendi doloribus perferendis quaerat maxime
                adipisci sapiente reprehenderit eum unde, necessitatibus tempora
                amet iusto voluptates explicabo harum nostrum nulla itaque
                quibusdam quam. Eos, sunt expedita! Commodi veniam beatae hic
                voluptates doloribus asperiores omnis magni, possimus ad
                architecto est modi dignissimos eveniet, nam eos ex, ipsam
                assumenda. Voluptatem, corporis asperiores adipisci numquam
                beatae officiis rerum quidem fugiat explicabo vitae. Repellat
                distinctio blanditiis ipsam non possimus vitae, qui veniam
                recusandae? Esse corrupti laborum asperiores, nihil magnam
                pariatur, quasi ipsa, sapiente in eveniet veniam beatae. Quia
                minus illum hic autem ipsum consequatur cupiditate corporis a
                sed fuga quasi consectetur voluptatum quis, commodi ex
                doloribus, dolorum, sit rem nostrum itaque quas eaque possimus
                eligendi sunt. Cum, molestiae, ab libero minus saepe voluptatem
                praesentium fugiat ut fugit illum dolorem dolore mollitia velit
                commodi enim explicabo reiciendis similique minima iure totam.
                Hic provident dolores placeat inventore alias, numquam fugiat
                adipisci ex consequatur nihil? Nisi porro dignissimos itaque.
                Cupiditate est id nam debitis, ipsum possimus sed nobis facere
                nesciunt enim minima officiis sunt vel dolor exercitationem
                quia, magni similique nihil harum excepturi? Vel quidem
                laboriosam atque sed impedit? Nihil, repudiandae rerum? Fugiat
                iusto ratione dolorum ducimus a, inventore quo, laudantium
                molestias velit atque dignissimos aut. Impedit dicta laborum
                accusantium, minus ea excepturi quos nemo, numquam corporis
                aliquid iste expedita aspernatur, sint explicabo asperiores
                incidunt nisi. Accusamus molestiae ullam earum natus non ratione
                ab corrupti nesciunt animi vitae aspernatur, expedita deserunt
                porro perspiciatis fugit! Voluptates ut adipisci dolore ex
                maxime. Itaque voluptas possimus ratione tempore quae sed
                tenetur sint mollitia laudantium maxime ut cumque, similique
                odit. Explicabo exercitationem, temporibus pariatur velit
                voluptas omnis nesciunt, quis, blanditiis odit laboriosam ipsum
                in quasi tempore voluptatum voluptates repellendus ut harum
                minima similique quo reprehenderit mollitia. Alias tenetur
                voluptatem corporis nobis nihil aliquam molestias amet incidunt,
                provident, corrupti velit! Mollitia ad commodi eaque facere ex!
                Sunt iste quam tempore nostrum soluta culpa ducimus reiciendis
                molestias maxime consequatur. Incidunt repudiandae repellendus
                odit doloribus tempora! Accusantium, maiores quaerat commodi
                dignissimos eum ad fuga assumenda. Voluptatum nulla, eveniet ex
                deleniti numquam reprehenderit consequuntur! Molestias fugit
                consequatur eligendi sapiente nemo, mollitia voluptatum nesciunt
                quasi ad sed, autem, iste doloribus hic illum alias assumenda
                possimus reprehenderit. Modi reiciendis atque explicabo eligendi
                veritatis ipsa voluptates repellendus distinctio dolor fugit
                neque, perspiciatis aliquid totam porro doloremque ratione
                sapiente voluptas amet quaerat enim, at, nulla facilis delectus
                magni. Quasi exercitationem modi aperiam repudiandae
                reprehenderit iusto pariatur ab tenetur unde perspiciatis, quo
                explicabo nostrum. Labore deserunt quis laudantium ut beatae
                asperiores eum culpa porro, non eaque optio cum expedita
                reprehenderit obcaecati modi laboriosam corporis consequatur.
                Maxime a, vitae nisi eveniet, architecto iure, aspernatur fugiat
                reiciendis earum dolorem quod ullam. Enim optio nulla vel?
                Explicabo ad ipsam, beatae earum rem quidem magni minima at
                consequuntur quos praesentium error eos porro perspiciatis
                deserunt temporibus ea molestiae et minus inventore soluta
                dignissimos eaque molestias qui? Dolorem, fuga nemo iste labore
                sequi doloremque voluptate natus ea, culpa odit voluptates
                tempora dolor obcaecati cum ad sunt exercitationem quo tenetur
                iusto, iure minima facere dicta reprehenderit aut. Et repellat
                rem minus praesentium reiciendis, eaque qui veniam sequi
                recusandae eum cupiditate nihil expedita beatae, cum amet harum
                sunt iusto voluptatem sint aut. Numquam reprehenderit nam
                impedit voluptatibus dolorum, sunt quisquam. Obcaecati error
                repellat quibusdam ratione, quisquam, esse optio quaerat iusto
                beatae officiis ad. Libero iste itaque quam quidem, aliquid,
                ipsum laborum assumenda hic repellat alias sapiente atque
                dolorem ut dignissimos adipisci quos eum aperiam, ex asperiores
                cum nam animi consectetur. Illo exercitationem officiis aliquam
                ipsum quisquam, neque, nulla maxime alias a cupiditate
                distinctio repellendus, explicabo numquam in expedita?
                Voluptatum nihil quos voluptatibus laboriosam. Pariatur quaerat
                explicabo vero illo animi sit aliquid cupiditate quia. Unde,
                delectus dolore? Cupiditate dolorem quisquam alias et at
                necessitatibus deserunt, adipisci veritatis iure excepturi!
                Fuga, asperiores reiciendis. Assumenda cumque a quasi enim
                recusandae eveniet quidem consequuntur voluptates optio dolorem
                sit asperiores voluptatibus, quisquam laboriosam similique
                repellendus ratione esse corporis consectetur, tempora, fugiat
                ea? Sit perferendis praesentium, libero commodi ut maiores
                quaerat nihil repellendus aperiam molestias ratione non eius
                facilis deserunt minus, nam enim dolores? Et minus minima quam
                quae asperiores unde! Facere accusantium explicabo, consequatur
                eum est expedita commodi quae doloribus minus provident error
                laborum dicta, blanditiis at dolores. Ab in aliquam harum autem
                animi asperiores voluptatum debitis mollitia, commodi ipsam,
                porro fuga nostrum cupiditate aliquid cumque dolores minima.
                Corporis, sapiente fugiat est ullam provident eaque dicta
                molestiae tempora, nulla saepe, sed ea similique vero enim?
                Nesciunt sunt deleniti rerum libero veritatis eos cum ullam.
                Blanditiis magnam a facilis ullam earum totam odit. Ipsam
                reiciendis, unde voluptatibus omnis aut reprehenderit dolores
                culpa officia suscipit tempore dignissimos molestias ipsa velit
                perspiciatis non magnam corrupti iste quia dicta ex assumenda
                commodi vitae ut provident. Architecto esse earum corrupti
                aliquid quibusdam eos, consequuntur nulla animi repellat
                corporis officia consequatur quo tenetur temporibus. Et dolorem
                commodi quibusdam, repellendus, temporibus dolor ipsum illum
                repellat voluptatum vitae ullam dolores. Temporibus eum maiores
                voluptatem magnam qui labore dolorem perferendis ipsum natus
                cumque accusantium et voluptates, laudantium repellendus iusto
                cum magni quas? Cumque voluptatibus modi corporis. Culpa quos,
                deleniti assumenda itaque aspernatur praesentium dolore
                recusandae ipsam similique! Beatae nulla commodi, aliquid, ipsum
                sint, cupiditate magnam amet totam perspiciatis quae repudiandae
                error voluptates labore! Quis vero placeat quod veniam vitae
                quaerat minima unde alias dolore? Libero, minus quasi! Sunt rem
                officiis cumque eos ut quas perferendis dolore laborum
                asperiores, similique iure sit iste dolorem nemo doloribus?
                Soluta architecto maxime quaerat repellat suscipit alias itaque
                corrupti debitis repudiandae doloribus eveniet ad vero,
                molestias totam neque fuga illum modi! Dolore, ad? Laboriosam
                ducimus rerum accusamus nulla beatae officia dolore
                reprehenderit. Recusandae tenetur odio sed quaerat consequatur
                quos. Pariatur, voluptatum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Maping Redux dispatch actions to component props
const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
});
// Connecting the component to Redux store
export default connect(mapStateToProps)(Graph);
