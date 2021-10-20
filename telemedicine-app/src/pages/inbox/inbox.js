import React from 'react'
import "./inbox.css";

import Navbar from '../../components/Navbar/Navbar';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import '../../components/Canvas.css';
import Footer from '../../components/Footer/Footer';
import Top from "../../components/inbox components/Top"
import InboxAccordion from '../../components/inbox components/InboxAccordion'
import { Link } from 'react-router-dom';




class Inbox extends React.Component {
    render() {
        return (

            <div class="title">
                <Navbar />
                <div className='page-canvas-outer'>
                    <div className='page-canvas-inner'>
                        <div className='canvas'>

                            <Top />
                            {/* <AccordionCustom />  */}
                        <div className="inbox-body">
                            <InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            />
                            <InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            /><InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            /><InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            /><InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            /><InboxAccordion

                                // Avatar image
                                from="John Doe"

                                // Put name here
                                title="Subject"

                                // Date will go here
                                date="10/11/2021"

                                // Message will go here
                                content="asl;djg wgjwogjwoiej wgowgjwlejfosjf  jowgnlwhfowigw eohwelgwjeohwoegw oegihjweofjwioefojfioshgowhg9owg wosdhowgnsbdojfops wlfjwemf  wlfjsorg wseoengshfsoeioweofjsojfomaofjsetegvnevweiopgosdjfosfjoegeifaljomasuksetejahlao  owgnwogosdhfis "

                            />
                            </div>



                            {/* <Accordion /> */}

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            // comment for pushing



        )
    }
}

const data = [
    {
        message: "Message 1",
        content: "Sowiejgowijgowjgwoijgoiwejgoijesethserthdrhse"
    },
    {
        message: "Message 2",
        content: "Sowiejgowijgowjgwoijgoiwejgoije"
    }
]


export default Inbox;
