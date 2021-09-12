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
    test('test Result component not shown', () => {
        render(<Tab />);
        const result = screen.queryByRole("result")
        expect(result).toBeNull();
    });
});