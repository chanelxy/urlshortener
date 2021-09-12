import { render, screen, fireEvent } from '@testing-library/react';
import Tab from '../components/Tab';

describe('Tabs', () => {
    test('renders Tabs component', () => {
        render(<Tab />);
        const tab = screen.getByText("Shorten");
        expect(tab).toBeInTheDocument();
        const tab2 = screen.getByText("Search");
        expect(tab2).toBeInTheDocument();
    });
    test('show Search tab when clicked', () => {
        render(<Tab />);
        fireEvent.click(screen.getByText("Search"))
        const label = screen.getByText("Enter a short.it URL to search")
        expect(label).toBeInTheDocument();
    });
    test('test Result component not shown before button is clicked', () => {
        render(<Tab />);
        const result = screen.queryByTestId("result")
        expect(result).toBeNull();
    });
    // test('test Result component shown after input', () => {
    //     render(<Tab />);
    //     screen.debug();
    //     fireEvent.change(screen.queryByRole("input"), {
    //         target: { value: 'testurl.com/abcxyz' }
    //     })
    //     fireEvent.click(screen.getByText("Short it!"))
    //     const result = screen.queryByTestId("result")
    //     expect(result).toBeInTheDocument();
    // });
});