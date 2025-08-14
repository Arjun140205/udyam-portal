import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DynamicForm from '../components/DynamicForm';

const mockSchema = {
  title: "Test Form",
  fields: [
    {
      key: "pan",
      label: "PAN",
      type: "text",
      required: true
    },
    {
      key: "aadhaar",
      label: "Aadhaar",
      type: "text",
      required: true
    }
  ]
};

describe('DynamicForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders all form fields from schema', () => {
    render(<DynamicForm schema={mockSchema} onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText('PAN')).toBeInTheDocument();
    expect(screen.getByLabelText('Aadhaar')).toBeInTheDocument();
  });

  it('validates PAN format correctly', async () => {
    render(<DynamicForm schema={mockSchema} onSubmit={mockOnSubmit} />);
    const panInput = screen.getByLabelText('PAN');
    
    fireEvent.change(panInput, { target: { value: 'invalid' } });
    fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid pan format/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates Aadhaar format correctly', async () => {
    render(<DynamicForm schema={mockSchema} onSubmit={mockOnSubmit} />);
    const aadhaarInput = screen.getByLabelText('Aadhaar');
    
    fireEvent.change(aadhaarInput, { target: { value: '123' } });
    fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid aadhaar format/i)).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits form with valid data', async () => {
    render(<DynamicForm schema={mockSchema} onSubmit={mockOnSubmit} />);
    
    fireEvent.change(screen.getByLabelText('PAN'), { target: { value: 'ABCDE1234F' } });
    fireEvent.change(screen.getByLabelText('Aadhaar'), { target: { value: '123456789012' } });
    fireEvent.submit(screen.getByRole('button', { name: /next/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        pan: 'ABCDE1234F',
        aadhaar: '123456789012'
      });
    });
  });
});
