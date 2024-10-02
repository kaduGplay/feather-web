import { Container, Navbar } from "@src/components";

export default function Terms() {
    return (
        <>
            <Navbar />
            <Container>
                <div className={"flex flex-col py-10"}>
                    <h1 className={"font-medium text-lg"}>Termos de Uso da plataforma.</h1>
                    <p className={"opacity-75 text-sm font-light"}>Neste documento está presente nossos termos de uso. Nós da FeatherHost pedimos para que você leia ele antes de comprar conosco!</p>
                    <p className={"opacity-75 text-xs font-light mt-3"}>Este documento foi pela última vez editado em: 18 de Julho de 2024</p>
                    <div className={"mt-24 flex flex-col gap-3"}>
                        <div>
                            <h1 className={"font-medium text-lg"}>1. Serviço de Hospedagem:</h1>
                            <p className={"ml-2 font-light opacity-80"}>A FeatherHost compromete-se a fornecer serviços
                                de hospedagem de servidores Minecraft, oferecendo um ambiente virtual estável e seguro
                                para a comunidade de jogadores. Ao contratar nossos serviços, os clientes concordam que
                                tenham mais de 18 anos ou estão representados de um responsável maior de idade e também
                                concordam em aceitar nossos termos estabelecidos neste documento.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>2. Pagamentos e Renovações:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Os clientes são responsáveis por efetuar os
                                pagamentos conforme os planos escolhidos. A renovação automática pode ser ativada para
                                assegurar a continuidade do serviço, ficando sob a responsabilidade do cliente manter o
                                valor de seu plano disponível e atualizar informações de pagamento conforme necessário.
                                Suspenderemos seu serviço após se passar 24 horas do dia de renovação e seus arquivos
                                ficaram salvos por até 10 dias até serem excluídos.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>3. Responsabilidades do Cliente:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Os clientes assumem a responsabilidade pela
                                gestão do seu servidor, incluindo configurações, instalação de plugins e realização de
                                backups. A FeatherHost não se responsabiliza por perdas de dados resultantes de ações ou
                                falta de cuidado do cliente. </p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>4. Atualizações e Manutenção:</h1>
                            <p className={"ml-2 font-light opacity-80"}>A FeatherHost reserva o direito de realizar
                                atualizações e manutenções programadas para garantir a estabilidade e segurança dos
                                servidores. Os clientes serão informados com antecedência sempre que possível,
                                minimizando impactos nas operações.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>5. Reembolsos:</h1>
                            <p className={"ml-2 font-light opacity-80"}>A FeatherHost terá até 30 dias úteis para
                                realizar o seu reembolso.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>6. Alteração de Porta:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Para os clientes da versão Bedrock, podemos
                                alterar sua porta sem custos no máximo duas vezes, após isso será cobrado uma taxa de R$
                                7,50 (sete reais e cinquenta centavos) para a mudança da porta.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>7. Uso do Serviço</h1>
                            <p className={"ml-2 font-light opacity-80"}>Você concorda em usar nossos serviços de maneira
                                legal e não utilizar nossos serviços para atividades ilegais ou maliciosas.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>8. Indenização:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Você concorda em indenizar e isentar a
                                FeatherHost de qualquer reivindicação ou demanda feita por terceiros devido ao seu uso
                                do serviço.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>9. Alterações nos Termos:</h1>
                            <p className={"ml-2 font-light opacity-80"}>A FeatherHost reserva o direito de modificar
                                estes termos. Os clientes serão notificados sobre quaisquer alterações significativas,
                                assegurando a transparência e o alinhamento com o Código de Defesa do Consumidor.</p>
                        </div>
                        <h1 className={"font-medium text-lg mt-14"}>Termos Adicionais de Acordo com o Código
                            do Consumidor:</h1>
                        <div>
                            <h1 className={"font-medium text-lg"}>1. Direito à Informação:</h1>
                            <p className={"ml-2 font-light opacity-80"}>A FeatherHost compromete-se a fornecer
                                informações claras e detalhadas sobre os serviços oferecidos, incluindo preços,
                                condições de pagamento e políticas de uso, conforme exigido pelo Código do
                                Consumidor.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>2. Garantia de Qualidade:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Os clientes têm o direito de receber serviços de hospedagem de alta qualidade, conforme anunciado. A FeatherHost se compromete a solucionar quaisquer problemas que comprometam a qualidade do serviço.</p>
                        </div>
                        <div>
                            <h1 className={"font-medium text-lg"}>3. Direito ao Reembolso:</h1>
                            <p className={"ml-2 font-light opacity-80"}>Nos termos da lei, os clientes têm o direito a fazer a solicitação de reembolso em até 7 dias após a contratação do serviço, com direito ao reembolso integral, descontando-se eventuais custos proporcionais ao uso.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}