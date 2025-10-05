from playwright.sync_api import sync_playwright, expect
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Use a unique email for registration
    unique_email = f"testuser_{int(time.time())}@example.com"
    password = "password"

    # Go to the registration page
    page.goto("http://127.0.0.1:8000/register")

    # Fill in the registration form
    page.get_by_label("Name").fill("Test User")
    page.get_by_label("Email").fill(unique_email)
    page.get_by_label("Password", exact=True).fill(password)
    page.get_by_label("Confirm Password").fill(password)

    # Click the register button
    page.get_by_role("button", name="Register").click()

    # Wait for navigation to the dashboard after registration
    expect(page).to_have_url("http://127.0.0.1:8000/admin/dashboard")

    # Navigate to the coupons page
    page.goto("http://127.0.0.1:8000/admin/order-module/coupons")

    # Assert that the coupons page is loaded
    expect(page.get_by_role("heading", name="Coupons")).to_be_visible()

    # Take a screenshot of the coupons page
    page.screenshot(path="jules-scratch/verification/coupons_page_screenshot.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)