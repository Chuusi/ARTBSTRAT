import "./AboutUs.css"

export const AboutUs = () => {
    return (
        <div className="aboutUs-container">
            <h2 className="aboutUs-title">CONOCE MÁS SOBRE NOSOTROS</h2>
            <div className="aboutUs-history">

                <img src="https://res.cloudinary.com/da7unrk9q/image/upload/v1715797954/logo_wqxsk8.jpg" alt="artbstrat" />
                <p>Artbstrat es una marca emergente fundada por Alberto, un fisioterapeuta de Cáceres con una pasión por el diseño. 
                    Tras mudarse a París para seguir su carrera, Alberto comenzó a crear tote bags en su tiempo libre, inspirado por el arte y 
                    la moda de la ciudad. Buscando nuevas fuentes de inspiración, se trasladó a la Isla de la Reunión, donde los vibrantes paisajes 
                    y la rica cultura local influyeron en sus diseños. Cada tote bag de Artbstrat es una obra de arte única, combinando la elegancia 
                    parisina con la vitalidad de la isla. Aunque todavía somos una marca emergente, cada pieza refleja la dedicación y la creatividad 
                    de Alberto.</p>
            </div>

            <div className="aboutUs-team">
                <h3>EQUIPO ARTBSTRAT</h3>
                <div className="aboutUs-team-alberto">
                    <img src="https://res.cloudinary.com/da7unrk9q/image/upload/v1717001584/Albertucho_oolwjp.jpg" alt="Alberto" />
                    <div className="aboutUs-Alberto-text">
                        <h4>Alberto Gonzalez Rojo</h4>
                        <p>Directo creativo</p>
                        <p>Fundador de la marca</p>
                    </div>
                </div>
                <div className="aboutUs-team-alberto">
                    <img src="https://res.cloudinary.com/da7unrk9q/image/upload/v1717004770/LosBobis_fpmd2u.jpg" alt="Web developers" />
                    <div className="aboutUs-Alberto-text">
                        <h4>Angel Leal Araya</h4>
                        <h4>Elena Ruano Herrera</h4>
                        <p> Desarrollo y mantenimiento Web</p>
                    </div>

                </div>
            </div>


            <h4 className="aboutUs-ending">Gracias por visitar nuestra página</h4>

        </div>
    )
}