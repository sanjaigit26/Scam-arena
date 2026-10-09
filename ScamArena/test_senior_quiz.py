import sys
import time
from playwright.sync_api import sync_playwright

def test_senior_quiz():
    with sync_playwright() as p:
        # Launch browser with touch emulation
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            has_touch=True,
            viewport={"width": 1280, "height": 800}
        )
        page = context.new_page()

        # Capture console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        print("1. Logging in as test user...")
        page.goto("http://localhost:3000/#/login")
        page.fill("#login-email", "agent@scamarena.com")
        page.fill("#login-password", "CyberDefender2025!")
        page.click("#btn-login-submit")
        page.wait_for_timeout(1000)

        # -------------------------------------------------------------
        # TEST CASE 1: Click SCAM (Correct Answer)
        # -------------------------------------------------------------
        print("\n2. Testing SCAM on senior_01 (Expected: Correct)...")
        page.goto("http://localhost:3000/#/arena/play?id=senior_01&mode=senior")
        page.wait_for_selector("#senior-act-scam", state="visible")

        # Verify buttons have >= 44px tap target
        box_scam = page.locator("#senior-act-scam").bounding_box()
        box_susp = page.locator("#senior-act-suspicious").bounding_box()
        box_safe = page.locator("#senior-act-safe").bounding_box()
        assert box_scam["height"] >= 44, f"SCAM button height {box_scam['height']} < 44px"
        assert box_susp["height"] >= 44, f"SUSPICIOUS button height {box_susp['height']} < 44px"
        assert box_safe["height"] >= 44, f"SAFE button height {box_safe['height']} < 44px"
        print(f"  Tap target sizes: SCAM={box_scam['height']}px, SUSP={box_susp['height']}px, SAFE={box_safe['height']}px (All >= 44px)")

        # Verify clues work
        page.click("button[data-key='sender']")
        clue_text = page.locator("#senior-clue-reveal").inner_text()
        assert "personal 10-digit mobile" in clue_text or "10-digit" in clue_text, f"Unexpected clue text: {clue_text}"
        print("  Investigation clue opened successfully.")

        # Click SCAM
        page.click("#senior-act-scam")
        page.wait_for_selector("#senior-feedback-panel", state="visible")

        feedback_html = page.locator("#senior-feedback-panel").inner_html()
        assert "Correct! This is a SCAM" in feedback_html, "Green banner headline missing"
        assert "Official electricity boards never send personal 10-digit mobile phone numbers" in feedback_html, "Explanation missing"
        assert "Threat of immediate power disconnection tonight" in feedback_html, "Red flag 1 missing"
        assert "Manufactured urgency" in feedback_html, "Red flag 2 missing"
        assert "Sent from a personal mobile phone number" in feedback_html, "Red flag 3 missing"
        assert "Direct payment demand" in feedback_html, "Red flag 4 missing"
        assert "Always Remember:" in feedback_html, "Always Remember tip missing"
        assert page.locator("#btn-next-senior-mission").is_visible(), "Next Mission button missing"

        # Check buttons disabled after answering
        assert page.locator("#senior-act-scam").is_disabled(), "SCAM button should be disabled after answering"
        assert page.locator("#senior-act-suspicious").is_disabled(), "SUSPICIOUS button should be disabled"
        assert page.locator("#senior-act-safe").is_disabled(), "SAFE button should be disabled"
        print("  SCAM feedback validated: Green banner, explanation, red flags, tip, and next button confirmed.")

        # -------------------------------------------------------------
        # TEST CASE 2: Touch Tap SUSPICIOUS (Wrong Answer)
        # -------------------------------------------------------------
        print("\n3. Testing Touch Tap SUSPICIOUS on senior_01 (Expected: Wrong / Not quite)...")
        page.goto("http://localhost:3000/#/arena/play?id=senior_01&mode=senior")
        page.wait_for_selector("#senior-act-suspicious", state="visible")

        # Emulate touch tap on SUSPICIOUS
        page.tap("#senior-act-suspicious")
        page.wait_for_selector("#senior-feedback-panel", state="visible")

        feedback_html = page.locator("#senior-feedback-panel").inner_html()
        assert "Not quite" in feedback_html, "Red banner headline 'Not quite' missing"
        assert "Correct Answer: SCAM" in feedback_html, "Correct Answer indicator missing"
        assert "Official electricity boards never send" in feedback_html, "Explanation missing"
        assert "Red Flags Identified:" in feedback_html, "Red flags section missing"
        assert page.locator("#btn-next-senior-mission").is_visible(), "Next Mission button missing"
        print("  Touch Tap SUSPICIOUS feedback validated: Red banner, Not quite, Correct Answer: SCAM, explanation.")

        # -------------------------------------------------------------
        # TEST CASE 3: Touch Tap SAFE (Wrong Answer)
        # -------------------------------------------------------------
        print("\n4. Testing Touch Tap SAFE on senior_01 (Expected: Wrong / Not quite)...")
        page.goto("http://localhost:3000/#/arena/play?id=senior_01&mode=senior")
        page.wait_for_selector("#senior-act-safe", state="visible")

        page.tap("#senior-act-safe")
        page.wait_for_selector("#senior-feedback-panel", state="visible")

        feedback_html = page.locator("#senior-feedback-panel").inner_html()
        assert "Not quite" in feedback_html, "Red banner headline 'Not quite' missing"
        assert "Correct Answer: SCAM" in feedback_html, "Correct Answer indicator missing"
        assert page.locator("#btn-next-senior-mission").is_visible(), "Next Mission button missing"
        print("  Touch Tap SAFE feedback validated: Red banner, Not quite, Correct Answer: SCAM.")

        # -------------------------------------------------------------
        # TEST CASE 4: Next Mission Button advances
        # -------------------------------------------------------------
        print("\n5. Testing NEXT MISSION button navigation...")
        page.click("#btn-next-senior-mission")
        page.wait_for_timeout(500)
        curr_hash = page.evaluate("() => window.location.hash")
        print(f"  Current hash after clicking NEXT MISSION: {curr_hash}")
        assert "senior_02" in curr_hash or "senior" in curr_hash, f"Unexpected hash {curr_hash}"
        assert page.locator("#senior-act-scam").is_visible(), "Next mission buttons should be visible"
        assert not page.locator("#senior-act-scam").is_disabled(), "Next mission buttons should be enabled"
        print("  Successfully advanced to next mission with enabled buttons.")

        # Check console errors
        print(f"\nConsole errors captured: {len(console_errors)}")
        if console_errors:
            for err in console_errors:
                print("  Console Error:", err)
            assert False, "Console errors occurred during execution!"

        print("\nALL SENIOR QUIZ CHECKS PASSED PERFECTLY!")
        browser.close()

if __name__ == "__main__":
    test_senior_quiz()
