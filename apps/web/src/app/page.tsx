import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 mt-32 px-4 py-8 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-[#512DA8] text-2xl font-semibold mb-8 text-center">
          UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
        </h1>

        <div className="bg-white rounded shadow-md">
          <div className="bg-[#007BFF] text-white text-lg font-medium px-4 py-2">
            Aadhaar Verification With OTP
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block mb-2">
                  <span className="font-medium">1. Aadhaar Number/ आधार संख्या</span>
                </label>
                <input 
                  type="text"
                  placeholder="Your Aadhaar No"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#512DA8]"
                />
              </div>
              
              <div>
                <label className="block mb-2">
                  <span className="font-medium">2. Name of Entrepreneur / उद्यमी का नाम</span>
                </label>
                <input 
                  type="text"
                  placeholder="Name as per Aadhaar"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#512DA8]"
                  disabled
                />
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <p>• Aadhaar number shall be required for Udyam Registration.</p>
              <p>• The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</p>
              <p>• In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicability of CGST Act 2017 and as notified by the ministry of MSME <a href="#" className="text-blue-600 hover:underline">vide S.O. 1055(E) dated 05th March 2021</a>) and PAN along with its Aadhaar number.</p>
            </div>

            <div className="mt-6">
              <label className="flex items-start space-x-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm">
                  I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सूक्ष्म०म०उ० मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सूक्ष्म०म०उ० मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहित / साझा नहीं किया जायेगा।
                </span>
              </label>
            </div>

            <div className="mt-6">
              <button className="bg-[#007BFF] text-white px-6 py-2 rounded hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-[#512DA8] focus:ring-offset-2">
                Validate & Generate OTP
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
  );
}
