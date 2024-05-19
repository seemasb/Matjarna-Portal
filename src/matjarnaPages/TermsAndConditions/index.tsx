import Lucide from "../../base-components/Lucide";

const Main = () => {
  return (
    <div className="w-auto px-10 py-10 mx-auto my-7 bg-white rounded-md shadow-md">
      <h3 className="text-2xl font-bold text-center mt-4 mb-10 lg:text-3xl">
        Terms And Conditions
      </h3>
      <div className="flex items-baseline">
        <div className="pr-2">
          <Lucide icon="ShoppingCart" color="#1E40AF" />
        </div>
        <h4
          className="text-2xl font-bold  mt-4 mb-10 lg:text-2xl"
          style={{ color: "#1E40AF" }}
        >
          Matjarna
        </h4>
      </div>
      <div className="intro-x">
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">
            Information Collection and Use
          </span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally, identifiable information may include but is
          not limited to your name ("Personal Information").
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">Log Data</span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          Like many service providers, we collect information whenever you use
          our Service ("Log Data"). This Log Data may include information such
          as your channel, conversation messages, the time and date of your
          visit, the time spent on those pages, and other statistics. In
          addition, we may use third-party services such as Microsoft Azure and
          Google Analytics that collect, monitor, and analyze this log data.
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">Communications</span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          We may use your Personal Information to contact you with newsletters,
          marketing, or promotional materials.
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">Cookies</span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          Cookies are files with a small amount of data, which may include an
          anonymous unique identifier.
          <br />
          Cookies are sent to your browser from a website and stored on your
          computer's hard drive.
          <br />
          Like many sites, we may use "cookies" to collect information. You can
          instruct your browser to refuse all cookies or to indicate when a
          cookie is being sent. However, if you do not accept cookies, you may
          not be able to use some portions of our Service features.
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">Security</span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          The security of your Personal Information is important to us, but
          remember that no method of transmission over the Internet, or method
          of electronic storage, is 100% secure. While we strive to use
          commercially acceptable means to protect your Personal Information, we
          cannot guarantee its absolute security.
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">
            Changes To This Privacy Policy
          </span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          This Privacy Policy is effective as of 1st January 2022 and will
          remain in effect except with respect to any changes in its provisions
          in the future, which will be in effect immediately after being posted
          on this page.
          <br />
          We reserve the right to update or change our Privacy Policy at any
          time and you should check this Privacy Policy periodically. Your
          continued use of the Service after we post any modifications to the
          Privacy Policy on this page will constitute your acknowledgment of the
          modifications and your consent to abide and be bound by the modified
          Privacy Policy.
          <br />
          If we make any material changes to this Privacy Policy, we will notify
          you either through the email address you have provided us or by
          placing a prominent notice on our website.
        </p>
        <p className="text-gray-800 dark:text-gray-300 mb-4 lg:text-md lg:mb-6">
          <span className="font-bold text-lg lg:text-xl">Contact Us</span>
          <hr className="w-16 my-2 border-t-4 dark:border-gray-600" />
          If you have any questions about this Privacy Policy, please contact
          us.
        </p>
      </div>
    </div>
  );
};

export default Main;
