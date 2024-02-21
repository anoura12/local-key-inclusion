import React, {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {useRouter} from "next/router";
import {useAuth} from "../src/useAuth";
import Layout from "../src/layout";
import remarkGfm from "remark-gfm"
import Modal from "react-modal";
import Image from "next/image";

const modalStyles = {
    overlay: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(0,0,0, 0.6)'
    },
    content: {
        position: 'relative',
        maxWidth: '1000px',
        maxHeight: '70vh',
        overflow: 'auto',
        padding: '30px',
        margin: '40px'
    },
};


const IndexPage = () => {

    const router = useRouter();
    const [isLoggedIn, isLoading] = useAuth();
    const [show, setShow] = useState(false);
    const [markdown, setMarkdown] = useState("");

    Modal.setAppElement('#__next');

    const fetchMarkdown = () => {
        fetch(`/api/get_manual?manual=manual.md`, {
            method: 'GET',
            mode: 'cors',
        }).then((r) => {
            if(r.ok)
                r.text().then((data) => {
                    setMarkdown(data)
                });
        })
    }

    useEffect(() => {
        if(!isLoading && !isLoggedIn){
            router.push("/login");
        }
        fetchMarkdown();
    }, [isLoading]);

    return (
        <Layout>
            <div className="flex justify-center items-center p-2">
                <div className="p-3" style={{ width: '1200px', maxWidth: '100%' }}>
                    <div className="w-1/3 p-2">
                        <div className="bg-white block shadow-lg text-center p-4 rounded-lg w-full" onClick={()=>setShow(prevState => !prevState)}>
                            <Image
                                width={120}
                                height={120}
                                src={require('../src/images/requests.webp')}
                            />
                            <div className="font-semibold text-lg">Read manual</div>
                        </div>
                    </div>
                    <Modal
                        isOpen={show}
                        onRequestClose={()=>setShow(false)}
                        style={modalStyles}
                    >
                        <button type="button"
                                onClick={()=>setShow(false)}
                                className="close_btn"
                        >
                            x
                        </button>
                        <div>
                            <ReactMarkdown  remarkPlugins={[remarkGfm]}>
                                {markdown}
                            </ReactMarkdown>
                        </div>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
}

export default IndexPage;
