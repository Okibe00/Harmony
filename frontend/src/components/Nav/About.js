/**
 * @description about section
 */


import './about.css';

const About = () => {
  return (
    //start
    <div className='about-container'>
        <h1>About Our Brand Code System</h1>
      <div class="content">
        <h2>About This Project</h2>
        <p>
          Welcome to our Brand Code System, a cutting-edge tool designed to
          streamline the identification and management of pharmaceutical
          products. Inspired by the FDA product code system, this platform
          ensures that each brand-name product is assigned a unique,
          identifiable code, eliminating confusion and enhancing efficiency in
          product tracking and reference.
        </p>

        <p>
          Our system serves as a comprehensive database that allows users to:
        </p>
        <ul>
          <li>
            <strong>Search</strong> for specific products by brand name,
            manufacturer, dosage form, or generic name.
          </li>
          <li>
            <strong>Filter</strong> results quickly and efficiently to pinpoint
            the exact product or group of products they need.
          </li>
        </ul>

        <h2>Key Features:</h2>
        <div class="feature">
          <h3>1. Unique Identification</h3>
          <p>
            Each product is assigned a unique code, ensuring no two products are
            ever confused. This is particularly useful for distinguishing
            between products with similar names or varying dosages.
          </p>
        </div>
        <div class="feature">
          <h3>2. Robust Search and Filter Options</h3>
          <p>
            Users can perform detailed searches by brand name, dosage form,
            manufacturer, and generic name, allowing for precise and
            user-friendly navigation through the database.
          </p>
        </div>
        <div class="feature">
          <h3>3. Streamlined Workflow</h3>
          <p>
            By consolidating product information in one place, this system saves
            time for healthcare professionals, pharmacists, and supply chain
            managers, ensuring accurate product selection and inventory
            management.
          </p>
        </div>

        <h2>Why This System Matters</h2>
        <p>
          The pharmaceutical industry often grapples with the challenge of
          maintaining accurate and accessible records of diverse products. This
          system addresses that challenge by providing a reliable, user-friendly
          solution that minimizes errors and enhances productivity.
        </p>
        <p>
          Whether you're a pharmacist, a healthcare provider, or a stakeholder
          in the pharmaceutical supply chain, our Brand Code System is designed
          with your needs in mind.
        </p>
        <p>
          <em>Stay organized. Stay efficient. Stay ahead.</em>
        </p>
      </div>
    </div> //end
  );
}
export default About; 