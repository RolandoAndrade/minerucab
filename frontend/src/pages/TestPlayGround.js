import React from 'react';
import {MainDashBoard} from "../components/MainDashBoard";
import {DashBoardSimple} from "../components/DashBoardSimple";
import {HeaderLogin} from "../components/HeaderLogin";

export class TestPlayGround extends React.Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    static clickMenu()
    {
        let element = document.getElementById("DashboardMenu");
        if(element.classList.contains("Up"))
        {
            element.classList.remove("Up");
            element.classList.add("Down");
        }
        else
        {
            element.classList.remove("Down");
            element.classList.add("Up");
        }

    }
    render = () => (
        <div className="TestPlayGround">
            <HeaderLogin hideMenuButton={this.props.main}/>
            <div id="DashboardMenu" className="DashBoardMenu Down">
                <DashBoardSimple main={false}/>
            </div>

            <div>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab architecto consequuntur corporis
                    dicta dolores ducimus exercitationem ipsum, iusto minima minus molestiae nobis odio praesentium quia
                    rem rerum vero. Ea?
                </div>
                <div>Consectetur cum eum exercitationem fugiat ipsa, labore magni obcaecati porro quas quidem rem
                    repellendus, soluta, tenetur. Aliquid at illum incidunt minus omnis, qui quisquam quos reiciendis
                    velit voluptate. Possimus, ratione?
                </div>
                <div>Accusamus autem blanditiis consequatur delectus deserunt eaque eius eligendi esse fuga illum, iusto
                    molestiae nostrum nulla, obcaecati quaerat qui recusandae sint? A consequatur dicta nesciunt nisi
                    quibusdam. Quas, quis rem.
                </div>
                <div>Amet doloremque ex excepturi fugiat hic in inventore ipsum labore laborum magnam minima modi
                    numquam placeat quia quisquam sapiente, voluptatem? Aperiam aut delectus laudantium modi quae qui
                    quis rem veniam.
                </div>
                <div>Accusantium distinctio maxime optio praesentium quae repellat soluta tenetur unde velit veritatis!
                    Beatae earum est fugiat in laborum, maiores obcaecati officiis quas, reiciendis, sit sunt temporibus
                    vel veniam voluptates voluptatum?
                </div>
                <div>Architecto doloremque eaque ipsam iure odit quo tempora veritatis, vero? Enim inventore laboriosam
                    quae quaerat vel veniam voluptate. Aliquam amet, at cum delectus dolorum maiores nesciunt
                    perspiciatis placeat quaerat quas.
                </div>
                <div>Accusamus atque dicta enim et explicabo facilis laudantium magni nihil nostrum officiis quae
                    quibusdam quidem quod totam, voluptates. Consectetur cupiditate eligendi in laudantium libero
                    mollitia nisi rem sit vel vitae.
                </div>
                <div>Adipisci amet aperiam doloribus eos expedita, unde. Explicabo, nesciunt, temporibus. Culpa cumque
                    dolor excepturi porro quis sed voluptate. Consectetur cum enim expedita, fuga id impedit ipsa nihil
                    non nostrum quasi.
                </div>
                <div>Aliquid amet omnis optio quia soluta ullam voluptate, voluptatem! Aliquid aperiam cumque explicabo
                    fugit, iusto nemo recusandae saepe similique? Aperiam, corporis dolorem doloremque eius illo
                    laboriosam magni minus reiciendis vero!
                </div>
                <div>Aperiam asperiores at consectetur culpa deleniti dolore doloribus in inventore ipsa, ipsum iure
                    magni maiores maxime natus nemo nesciunt nihil odit officiis perferendis quae quia quidem
                    repellendus vel voluptatibus voluptatum.
                </div></div>
        </div>
    )
}