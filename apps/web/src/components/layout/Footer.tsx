export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500">
            This is a clone project for educational purposes only. For official registration, please visit{' '}
            <a
              href="https://udyamregistration.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Udyam Registration Portal
            </a>
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            &copy; {new Date().getFullYear()} Udyam Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
