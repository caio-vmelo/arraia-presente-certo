
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID") || "";
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID") || "";
const EMAILJS_PUBLIC_KEY = Deno.env.get("EMAILJS_PUBLIC_KEY") || "";
const EMAILJS_OWNER_TEMPLATE_ID = Deno.env.get("EMAILJS_OWNER_TEMPLATE_ID") || "";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders 
    });
  }
  
  try {
    const { type, data } = await req.json();
    
    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail e dados são obrigatórios" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Since we can't use EmailJS directly in an edge function (server-side),
    // we'll just simulate a successful response for now
    // In a production environment, you would integrate with a server-compatible email service
    // like SendGrid, Mailgun, or Amazon SES
    
    console.log(`Email type ${type} requested for:`, JSON.stringify(data));
    
    if (type === "reservation") {
      console.log(`Would send reservation confirmation email to: ${data.recipientEmail}`);
      // In a real implementation:
      // await sendEmailWithSupportedProvider(data.recipientEmail, `Reserva confirmada: ${data.giftName}`, `Olá ${data.senderName}, sua reserva do presente "${data.giftName}" foi confirmada!`);
    } else if (type === "notification") {
      console.log(`Would send owner notification email about: ${data.giftName} reserved by ${data.senderName}`);
      // In a real implementation:
      // await sendEmailWithSupportedProvider("viniciuscaioml@gmail.com", `Presente Reservado: ${data.giftName}`, `${data.senderName} (${data.recipientEmail}) reservou o presente "${data.giftName}"`);
    } else {
      return new Response(
        JSON.stringify({ error: "Tipo de e-mail inválido" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Since we're just logging and not actually sending emails at this point,
    // we'll return a successful response
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
    
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
