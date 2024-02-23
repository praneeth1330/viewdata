import React from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import NavBar from "./NavBar";
import { IoArrowBackOutline } from "react-icons/io5";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "./graph.scss";

interface GraphData {
  company_name: string;
  principal_business_activity_as_per_cin: string;
  authorized_cap: number;
  paidup_capital: number;
  company_class: string;
  company_status: string;
  registered_state: string;
}

interface RootState {
  graphs: {
    graphs: GraphData[][];
  };
}

interface RouteParams {
  id: string;
}

interface Props {
  graphs: GraphData[][];
}

const Graph: React.FC<Props> = ({ graphs }) => {
  const { id } = useParams<RouteParams>();

  const graphData = graphs[parseInt(id, 10)] || [];

  if (graphData.length === 0) {
    return <div>No data available</div>; // Render message if no data is found
  }

  return (
    <div className="single-graph">
      <NavBar />
      <div className="graph-details-page">
        <div className="back">
          <Link to="/home">
            <MdOutlineArrowBackIosNew className="back-button" />
          </Link>
        </div>
        <div className="graph-text">
          <h3>{graphData[0].registered_state}</h3>
        </div>
        <div className="single-graph-container">
          <div className="chart">
            <p>Chart Data of company's</p>
            <Chart
              options={{
                chart: {
                  id: `basic-bar-details`,

                  // parentHeightOffset: 0,
                },

                xaxis: {
                  categories: graphData.map((record) =>
                    record.company_name.slice(0, 10)
                  ),
                },
              }}
              series={[
                {
                  name: `series-details`,
                  data: graphData.map((record) => record.paidup_capital),
                },
              ]}
              type="line"
              className="chart-data"
            />
          </div>
          <div className="table">
            <p>Tabular data of company's</p>
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Business</th>
                  <th>Capital</th>
                  <th>Paid-up Capital</th>
                  <th>Class</th>
                  <th>Company Status</th>
                </tr>
              </thead>
              <tbody>
                {graphData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.company_name.slice(0, 10)}</td>
                    <td>{record.principal_business_activity_as_per_cin}</td>
                    <td>{record.authorized_cap}</td>
                    <td>{record.paidup_capital}</td>
                    <td>{record.company_class}</td>
                    <td>{record.company_status}</td>
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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Cupiditate dolor temporibus cum repudiandae! Nesciunt
                reprehenderit obcaecati eaque architecto aspernatur dolores
                atque illum mollitia? Fugiat corporis praesentium pariatur illum
                nemo magni?
              </p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
              ducimus sapiente veritatis quaerat a doloremque cupiditate,
              voluptatum deleniti repellendus dicta. Praesentium iure labore
              placeat quas quibusdam dolor magnam veniam similique recusandae
              odio, ex magni nulla animi ab rem velit tempora officiis atque
              exercitationem numquam. Libero sequi ad necessitatibus distinctio
              vitae!
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
                dicta excepturi quibusdam, perspiciatis architecto recusandae
                assumenda nostrum a cupiditate culpa voluptatem alias? Debitis
                ex, tempore deleniti quo aut eius impedit excepturi doloribus
                illo reprehenderit, aperiam numquam reiciendis. Nemo perferendis
                dolore accusamus pariatur eos ex delectus debitis? Facilis,
                molestias. Doloremque dolore natus reiciendis! Minus, dolor.
                Consectetur esse velit commodi modi debitis obcaecati, ratione
                asperiores iure cum laudantium quibusdam! Quis quae dignissimos
                impedit porro natus error facere facilis? Ad, officia impedit
                culpa incidunt similique nam consequatur quam dicta eius tempora
                illum, cum fuga assumenda unde deserunt earum debitis
                exercitationem? Eos quam quae nulla, culpa earum eius possimus
                architecto tempora molestiae, eum sed reiciendis voluptatibus
                amet aperiam aliquam non iste quibusdam! Fugiat, officia.
                Molestiae non facere, aliquam <br />
                ipsam exercitationem illo ea. In atque at, adipisci aliquam
                commodi et similique expedita omnis blanditiis ullam libero?
                Assumenda saepe quibusdam recusandae molestiae omnis accusantium
                delectus. Unde possimus, nihil voluptas sunt blanditiis adipisci
                velit animi atque tempore earum quae necessitatibus molestiae
                reprehenderit vitae eligendi quasi aperiam, recusandae tenetur
                assumenda fuga repellat modi quos. Excepturi saepe possimus
                obcaecati commodi, perferendis aliquam dignissimos dolorum
                soluta laborum dicta blanditiis numquam voluptatem cumque eius
                culpa hic adipisci quae! Ratione, corrupti commodi tenetur eius
                illum unde recusandae sunt incidunt deleniti, tempora numquam
                facere iusto. Laudantium voluptatibus eius mollitia amet maiores
                laborum distinctio illum tempora laboriosam? Ea accusantium
                dolores dignissimos saepe repellendus totam qui eveniet magnam
                assumenda reiciendis commodi dolorum culpa animi, molestias
                laboriosam enim itaque sunt officiis ullam iste! <br />{" "}
                Deserunt, dignissimos cum repellat reiciendis dicta dolore
                provident quam error ea mollitia tenetur! Minima in quae nostrum
                porro aut architecto repellendus natus cupiditate molestias
                libero recusandae error mollitia, quisquam omnis labore
                consectetur optio nisi reprehenderit voluptatibus voluptatum
                atque commodi aspernatur et distinctio? Magni esse iste, odio,
                facilis eligendi, deserunt enim ex dolorum qui error laborum
                exercitationem repellendus maxime cum voluptate reprehenderit
                nisi eaque velit unde eveniet quisquam vitae? Distinctio quos
                architecto veniam nihil sapiente voluptas nulla, voluptatibus
                vel a sint harum nam dolore! Beatae voluptates, officia, rem
                ducimus expedita nobis, facere unde laborum obcaecati eius
                suscipit repellendus a illo eos optio consequuntur doloribus
                odio dolorum porro temporibus nulla quaerat? Cum iste omnis,
                quisquam, impedit dolor facere soluta aut totam fugiat nemo
                aliquid autem aspernatur voluptate fugit eius officia nesciunt
                praesentium sit. Id quod molestiae rem beatae sequi atque culpa
                architecto <br />
                veniam natus minus a error iusto cum, aliquam reprehenderit
                dignissimos labore. At cum illum, alias delectus facere error
                excepturi expedita quae laborum a hic molestiae ullam
                repellendus voluptatum unde quis enim pariatur dolorem
                temporibus? Natus accusantium deleniti illum iste deserunt
                distinctio laudantium consequatur quis rerum libero alias
                architecto aut quam amet optio nemo, expedita magnam! Nobis,
                necessitatibus! Ratione commodi tempora nihil, illo suscipit
                eligendi quis consequuntur ad fugiat, temporibus dolorem officia
                quas animi ipsa. Voluptas culpa magnam molestiae! Facilis, quam
                eum officiis alias totam suscipit dolor in molestiae voluptate!
                Quidem necessitatibus a qui mollitia! Distinctio omnis earum,
                maiores fugiat atque quae id, alias itaque cum incidunt quasi
                rem perferendis saepe totam mollitia consequuntur? Iure nesciunt
                officiis fugiat deserunt, error laboriosam unde? Repudiandae
                consectetur, delectus ipsum vero fugiat modi voluptates nesciunt
                hic sequi esse ullam quam est laborum accusantium iste quia
                nostrum? Eveniet nisi iste totam quisquam hic assumenda
                voluptatem dolorum sapiente, sequi error distinctio praesentium
                minus <br />
                <br />
                illum atque dolores repudiandae ad qui ipsam similique
                exercitationem est expedita! Dolorum perferendis quo minima
                quasi ex dolorem quidem, ea minus odio delectus praesentium eum
                sit, aperiam rem et vel debitis ipsa saepe quibusdam eius
                architecto similique eaque impedit. Aliquid, aut iure tenetur
                aperiam voluptas delectus ipsum quisquam dolor quibusdam,
                laudantium eveniet tempora vitae quo quos exercitationem
                deserunt fugiat quaerat incidunt dolorum? Doloribus quisquam
                eveniet sit. Fugiat optio sed perspiciatis voluptates maiores.
                Adipisci recusandae cum consequatur enim voluptatibus quas
                veritatis, mollitia soluta a perferendis consectetur ratione
                reprehenderit eligendi minus <br /> <br />
                exercitationem, cupiditate aspernatur culpa ipsa! Reprehenderit,
                repellat. Libero officia, fuga assumenda nulla ratione eum. Illo
                repellat aspernatur, natus enim quibusdam tempore ipsum nam quas
                quo fugit. Qui fugiat, eos reiciendis eaque quos voluptatem sint
                consequatur nobis, nemo ipsum a assumenda aliquam. Fugiat,
                dolores! Obcaecati recusandae atque autem saepe sapiente? Ipsa
                aperiam illum perferendis provident qui, eius consectetur vel
                fugit. Nostrum placeat consequatur quas asperiores laudantium,
                aliquam ipsa, voluptas officiis fugiat aspernatur labore id
                omnis et laboriosam totam, porro quia. Amet soluta ab id
                doloremque inventore labore officia repellendus, illo itaque
                voluptates necessitatibus sint culpa hic cum nulla quasi
                laudantium, in tenetur ut aliquam aliquid! Placeat corrupti modi
                quia, quaerat inventore magni libero commodi exercitationem
                reiciendis quas error suscipit officiis nesciunt <br />
                <br /> cupiditate adipisci sapiente tempore, incidunt ducimus
                maxime recusandae. Veritatis odit aspernatur autem facere
                officia, iusto sunt, odio ea incidunt minima similique
                consequuntur debitis tenetur amet? Est nulla facilis nobis,
                fugit optio possimus accusamus, similique iste odio, provident
                eveniet magni temporibus! Atque dicta dolor voluptatum
                necessitatibus aut quibusdam praesentium quam saepe rem
                distinctio molestiae officiis minima deleniti laudantium cumque,
                expedita, quaerat at et quisquam. Ullam ut esse repellendus
                blanditiis alias! Nihil soluta deserunt perferendis error unde
                iure quod ad at, beatae molestiae autem, possimus maiores, sunt
                repudiandae sint dignissimos? Sapiente adipisci nobis quidem
                nostrum rerum consectetur est temporibus quod optio quibusdam
                eos, recusandae sint sed totam officia dolorum atque odit
                consequatur facere quasi tempore. Minima a quisquam tempora. At
                veritatis magni quas quis! Ipsum illum nihil, inventore in
                corporis laboriosam qui, aliquid accusamus suscipit, distinctio
                maiores voluptatum sint similique quos possimus perspiciatis
                maxime tenetur quibusdam blanditiis minima autem soluta tempora?
                Sint <br />
                impedit ad eligendi placeat autem mollitia, sit quibusdam
                recusandae, voluptatem ullam unde corrupti odio animi
                architecto, quas corporis nulla pariatur magni deserunt
                blanditiis facere quam! Inventore saepe ipsum necessitatibus
                aspernatur qui quisquam veniam non fugiat nostrum cupiditate
                consectetur beatae accusamus voluptatem sapiente praesentium
                nemo earum dolorem, quia quas similique debitis unde, quo cum?
                Iure quae numquam vitae cumque. Maiores libero esse veritatis
                pariatur culpa <br />
                accusantium repellendus nemo, consectetur magni! Vero quo magni
                possimus nesciunt maiores inventore molestias nobis, assumenda
                beatae, voluptates, earum sit. Sint expedita esse minima.
                Voluptatem, animi? Veniam, qui? Accusamus veritatis, recusandae
                quo maxime officiis hic?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  graphs: state.graphs.graphs,
});

export default connect(mapStateToProps)(Graph);
